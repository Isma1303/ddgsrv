import { UnauthorizedError } from './../errors/controller.error'
import { Request, Response, NextFunction } from 'express'
import * as passport from 'passport'
import config from '../../config'
import * as jwt from 'jsonwebtoken'
import { parseHeaderParams } from './transform.utils'

import { insecureCrypt } from './crypt.utils'
import UserModel from '../../security/user/user.model'
import UserRoleModel from '../../security/user_role/user_role.model'
import TableRoleRecordModel from '../../security/table_role_record/table_role_record.model'
import jwksClient = require('jwks-rsa')

const getAuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const params = parseHeaderParams(req.headers, ['ms'])
    if (params.ms == 1) authEntraIDMiddleware(req, res, next)
    else authMiddleware(req, res, next)
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, function (error: any, user: any) {
        if (error || !user) {
            return res.status(401).json({
                message: 'You are not authorized to access this resource',
                statusCode: 401,
            })
        } else {
            return next()
        }
    })(req, res, next)
}

const authEntraIDMiddleware = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('oauth-bearer', { session: false }, function (error: any, user: any) {
        if (error || !user) {
            return res.status(401).json({
                message: 'You are not authorized to access this resource',
                statusCode: 401,
            })
        } else {
            return next()
        }
    })(req, res, next)
}

const getAuthorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const notAuthorized = {
        message: 'You do not have the necessary permissions to access this resource',
        statusCode: 403,
    }
    const write_permissionMethods = ['POST', 'PUT', 'DELETE']
    const tableName = res.locals.controller.model.tableName
    try {
        const userModel = new UserModel()
        let userActions = await userModel.getActions(await getUserId(req))

        userActions = userActions.sort((action: any) => (action.write_permission ? -1 : 1))

        const tableAccess = userActions.find((action: any) => action.table_name.toUpperCase() == tableName.toUpperCase())

        if (!tableAccess) return res.status(403).json(notAuthorized)

        const write_permissionAccess = userActions.find((action: any) => {
            if (action.table_name == tableName && action.write_permission) return action
        })

        if (write_permissionMethods.includes(req.method) && !write_permissionAccess && !req.url.includes('getAffectedRecordsByQuery'))
            return res.status(403).json(notAuthorized)

        next()
    } catch (error: any) {
        return res.status(500).send(error.message)
    }
}

const verifyToken = (token: string) => {
    return new Promise<Record<string, any>>((resolve, reject) => {
        jwt.verify(token, config.JWT_SECRET, (err, payload) => {
            if (err) return reject({ ...err, error: true })
            if (typeof payload !== 'undefined' && typeof payload !== 'string') return resolve({ ...payload, error: false })
        })
    })
}

const verifyTokenAD = async (token: string): Promise<any> => {
    const client = jwksClient({
        jwksUri: `https://login.microsoftonline.com/${config.AZURE_AD.AZURE_TENANT_ID}/discovery/keys`,
        requestHeaders: {},
        cache: true, // Habilitamos el cache
        cacheMaxAge: 600000, // Cache por 10 minutos
        timeout: 30000,
    })

    try {
        // Decodificamos el token sin verificar para obtener el kid
        const decodedToken = jwt.decode(token, { complete: true })
        if (!decodedToken || typeof decodedToken === 'string') {
            throw new Error('Invalid token format')
        }

        // Obtenemos el kid del token
        const kid = decodedToken.header.kid
        if (!kid) {
            throw new Error('No kid found in token')
        }

        // Obtenemos la clave específica para ese kid
        const key = await client.getSigningKey(kid)
        const publicKey = key.getPublicKey()

        // Verificamos el token
        return new Promise((resolve, reject) => {
            jwt.verify(
                token,
                publicKey,
                {
                    algorithms: ['RS256'],
                },
                (err: any, decoded: any) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(decoded)
                    }
                },
            )
        })
    } catch (error: any) {
        throw new Error(`Token verification failed: ${error.message}`)
    }
}

const getUserId = async (req: Request) => {
    const token = req.header('Authorization')?.split(' ')[1] || ''
    if (!token) {
        throw new UnauthorizedError('Authorization token is missing')
    }

    const user = await verifyToken(token).catch(() => {
        throw new UnauthorizedError('Invalid or expired authorization token')
    })

    if (typeof user !== 'string' && user.id) {
        return parseInt(user.id)
    } else {
        throw new UnauthorizedError('User is not authenticated')
    }
}

const getUser = async (req: Request) => {
    const token = req.header('Authorization')?.split(' ')[1] || ''

    if (!token) {
        throw new UnauthorizedError('Authorization token is missing')
    }

    const user = await verifyToken(token).catch(() => {
        throw new UnauthorizedError('Invalid or expired authorization token')
    })

    if (typeof user !== 'string' && user.id) {
        return user
    } else {
        throw new UnauthorizedError('User is not authenticated')
    }
}

const getFilteredUserRecords = async (userId = 0, tableFields: string[]): Promise<Record<string, any>[]> => {
    if (!userId) return []

    const userRoleModel = new UserRoleModel()
    const roles = await userRoleModel.getAssignedRoles(userId).then((res) => res.map((role) => role.role_id) || [])

    if (roles.length < 0) return []

    const tableRoleRecordModel = new TableRoleRecordModel()

    const filteredFields = await tableRoleRecordModel.getFilteredFields().then((res) => (res.length > 0 ? res.map((field) => field.field) : []))

    const matchingFields = tableFields.filter((field) => filteredFields.includes(field))

    if (matchingFields.length == 0) return []

    const filteredUserRecords: Record<string, any>[] = await tableRoleRecordModel
        .getAssignedTableRecords(roles)
        .then((res) => (res.length > 0 ? res : []))

    return filteredUserRecords
}

const generateToken = async (payload: any, sessionTime: number) => {
    return jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: sessionTime, // Time in seconds
    })
}

const generateEncryptedToken = async (userId: string, appId: string, salt: string) => {
    const tokenInfo: Record<string, any> = {}

    tokenInfo[btoa('userId')] = btoa(userId)
    tokenInfo[btoa('appId')] = btoa(appId)

    const token = await generateToken(tokenInfo, 60)

    return insecureCrypt(token, salt)
}

export {
    authMiddleware,
    authEntraIDMiddleware as authMiddlewareAD,
    getAuthenticationMiddleware,
    getAuthorizationMiddleware,
    verifyToken,
    getUser,
    getUserId,
    getFilteredUserRecords,
    generateToken,
    generateEncryptedToken,
    verifyTokenAD,
}
