import { Request } from 'express-serve-static-core'
import Controller from '../../system/controller'
import Condicion from '../../system/interfaces/condition.interface'
import Response from '../../system/interfaces/response.interface'
import UserModel from './user.model'
import * as jwt from 'jsonwebtoken'
import config from '../../config'
import { ResponseToken } from '../../system/interfaces/token_response.interface'
import { atob, comparePassword } from '../../system/utils/crypt.utils'
import { getUserId, verifyToken, verifyTokenAD } from '../../system/utils/auth.utils'
import ConfiguracionModel from '../configuration/configuration.model'
import { HttpStatusCodes } from '../../system/interfaces/http_status_codes'
import { MissingParameterError, ResetPasswordTokenExpiredError, UnauthorizedError } from '../../system/errors/controller.error'
import { GenericError } from '../../system/errors/error'
import { IUser, IUserNew, IUserUpdate } from './user.interface'
import { IConfiguration, IConfigurationUpdate, IConfigurationNew } from '../configuration/configuration.interface'
import RoleModel from '../role/role.model'
import UserRoleModel from '../user_role/user_role.model'
import { parseHeaderParams } from '../../system/utils/transform.utils'
export default class userController extends Controller<IUser, IUserNew, IUserUpdate> {
    configuracionModel = new ConfiguracionModel<IConfiguration, IConfigurationNew, IConfigurationUpdate>()
    model: UserModel
    constructor() {
        super()
        this.model = new UserModel()
    }

    public async authenticate(req: Request): Promise<ResponseToken | Response> {
        try {
            const params = parseHeaderParams(req.headers, ['ms'])
            let { password } = req.body
            const { user, ms_token } = req.body

            if (params.ms && params.ms == '1') {
                if (!ms_token) throw new GenericError('Invalid Token', HttpStatusCodes.BAD_REQUEST)
            } else {
                if (!password || password === '') throw new MissingParameterError('password')
                if (!user || user === '') throw new MissingParameterError('user')

                if (password) password = atob(password)
            }

            const foundUser = await this.getUserAuthentication(req)

            if (!foundUser || !('status' in foundUser)) throw new GenericError('Usuario o contraseña incorrecta', HttpStatusCodes.BAD_REQUEST)

            const userStatus = foundUser.status ? 'Activo' : 'Inactivo'

            if (userStatus != 'Activo') throw new GenericError('Usuario o contraseña incorrecta', HttpStatusCodes.BAD_REQUEST)

            const version = await this.configuracionModel.findByKey('APP_VERSION')

            delete foundUser.password

            return this.responseHandler({
                statusCode: HttpStatusCodes.OK,
                message: 'Authenticated user',
                data: { user: foundUser },
                token: await this.generateToken({ ...foundUser }),
                version: version?.value || '',
            })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    public async authToken(req: Request): Promise<ResponseToken | Response> {
        try {
            const foundUser = await this.getUserAuthentication(req)

            if (!foundUser || !('status' in foundUser)) throw new GenericError('Usuario o contraseña incorrecta', HttpStatusCodes.BAD_REQUEST)

            const userStatus = foundUser.status ? 'Activo' : 'Inactivo'

            if (userStatus != 'Activo') throw new GenericError('Usuario o contraseña incorrecta', HttpStatusCodes.BAD_REQUEST)

            const version = await this.configuracionModel.findByKey('APP_VERSION')

            return this.responseHandler({
                statusCode: HttpStatusCodes.OK,
                message: 'Usuario autenticado',
                token: await this.generateToken({ ...foundUser }),
                version: version?.value || '',
            })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    private async generateToken(user: any, databaseType = 1) {
        const sessionTime = await this.configuracionModel.findByKey('SESSION_TIME_SEC')

        return jwt.sign(
            {
                id: user.user_id,
                email: user.email,
                user: user.user,
                database_type: databaseType,
            },
            config.JWT_SECRET,
            {
                expiresIn: parseInt(sessionTime?.value || '3600'), //Tiempo en segundos
            },
        )
    }

    public async getUserInfo(req: Request): Promise<Response> {
        try {
            const userId = (await getUserId(req)) || 0

            const user = await this.model.getById(userId)

            if (!user) throw new GenericError('Usuario no encontrado', HttpStatusCodes.BAD_REQUEST)

            const version = await this.configuracionModel.findByKey('APP_VERSION')

            const maxMultipleUpdate = await this.configuracionModel.findByKey('MAX_MULTIPLE_UPDATE')

            const userActions = await this.model.getActions(userId)

            const actions: Record<string, boolean> = {}

            if (userActions.length > 0) {
                userActions.forEach((action) => {
                    const property = action.table_name.toUpperCase()
                    if (Object.prototype.hasOwnProperty.call(actions, property)) actions[property] = actions[property] || action.write_permission
                    else actions[property] = action.write_permission
                })
            }

            const data: Record<string, any> = {
                version: version?.value || '',
                actions,
                maxMultipleUpdate: parseInt(maxMultipleUpdate?.value || '1000'),
                user,
            }
            return this.responseHandler({ data, statusCode: HttpStatusCodes.OK, message: `Información del usuario ${user.user}` })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    public async getAuthenticatedUser(req: Request): Promise<Response> {
        try {
            const userId = (await getUserId(req)) || 0

            const user = await this.model.getById(userId)

            if (!user) throw new GenericError('Usuario no encontrado', HttpStatusCodes.BAD_REQUEST)

            delete user.password

            return this.responseHandler({ data: user, statusCode: HttpStatusCodes.OK, message: `Información del usuario ${user.user}` })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    public async getAppVersion(): Promise<Response> {
        try {
            const version = await this.configuracionModel.findByKey('APP_VERSION')

            const data: Record<string, any> = {
                version: version?.value || '',
            }

            return this.responseHandler({ data, statusCode: HttpStatusCodes.OK, message: 'Información de la versión' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    public async validateActualPassword(req: Request): Promise<Response> {
        try {
            const { passwordActual } = req.params

            const userId = await getUserId(req)

            const user = await this.model.getById(userId)

            if (!user) throw new GenericError('Usuario no encontrado', HttpStatusCodes.BAD_REQUEST)

            const isSamePassword = await comparePassword(atob(passwordActual), user.password || '')

            return this.responseHandler({ data: { isSamePassword }, statusCode: HttpStatusCodes.OK, message: 'Validación de contraseña actual' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    public async changePassword(req: Request): Promise<Response> {
        try {
            const { password, token } = req.body

            if (!password || password === '') throw new MissingParameterError('password')

            const user = await verifyToken(token)

            if (typeof user === 'string') throw new UnauthorizedError('Invalid Token')

            await this.model.updateById({ id: user.id, record: { password }, userId: user.id })

            return this.responseHandler({ statusCode: HttpStatusCodes.OK, message: 'Contraseña actualizada' })
        } catch (err: any) {
            const error = new ResetPasswordTokenExpiredError()
            return this.errorHandler(error)
        }
    }

    async getUserAuthentication(req: Request): Promise<IUser | null> {
        const params = parseHeaderParams(req.headers, ['ms'])
        const { user, ms_token } = req.body
        let { password } = req.body

        if (params.ms && params.ms == '1') {
            const adDates = await verifyTokenAD(ms_token)
            if (!adDates) throw new GenericError('Invalid Token', HttpStatusCodes.BAD_REQUEST)
            const email = adDates.preferred_username
            const userFound = await this.model.search({ conditions: [{ field: 'email', value: email }] })
            if (userFound.length === 0) throw new GenericError('Usuario o contraseña incorrecta', HttpStatusCodes.BAD_REQUEST)
            return userFound[0]
        }

        if (!user || !password) return null
        password = atob(password).trim()

        const conditions: Condicion[] = [
            {
                field: 'user',
                value: user,
            },
        ]
        const response = await this.model.search({ conditions })
        const foundUser = response.length > 0 ? response[0] : null
        if (foundUser) {
            if (!(await comparePassword(password, foundUser?.password || '')))
                throw new GenericError('Usuario o contraseña incorrecta', HttpStatusCodes.BAD_REQUEST)
        }
        return foundUser
    }

    public async add(req: Request): Promise<Response> {
        try {
            const userId = await getUserId(req)
            const insertedRecord = await this.model.add(req.body)
            if (!insertedRecord) throw new GenericError('Error al crear el usuario', HttpStatusCodes.BAD_REQUEST)
            const rolesModel = new RoleModel()
            const role = await rolesModel.search({ conditions: [{ field: 'role', value: 'Usuario' }], offset: 0, limit: 1 })

            if (role.length > 0) {
                const userRolModel = new UserRoleModel()
                await userRolModel.add({ user_id: insertedRecord.user_id, role_id: role[0].role_id }, userId)
            }

            return this.responseHandler({ data: insertedRecord, message: 'Record added successfully', statusCode: HttpStatusCodes.CREATED })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }
}
