import { ResponseHandlerParams } from './interfaces/controller.interface'
import { Request } from 'express'
import Condition from './interfaces/condition.interface'
import { Detail } from './interfaces/detail.interface'
import IResponse from './interfaces/response.interface'
import * as jwt from 'jsonwebtoken'
import * as nodemailer from 'nodemailer'
import { nodeMailerConfig } from './lib/nodemailer.config'
import Email from './interfaces/email.interface'
import { getUserId } from './utils/auth.utils'
import { parseHeaderParams } from './utils/transform.utils'
import Model from './model'
import {
    InvalidParameterTypeError,
    MissingParameterError,
    BadRequestError,
    UnauthorizedError,
    ResetPasswordTokenExpiredError,
} from './errors/controller.error'
import { HttpStatusCodes } from './interfaces/http_status_codes'
import { BusinessError, DatabaseError, InvalidStructureError } from './errors/model.error'
import { HttpStatusCodesTypes } from './interfaces/http_status_codes'
import { IResponseToken } from './interfaces/token_response.interface'
import { FatalGenericError, GenericError } from './errors/error'

/**
 * @class Controller
 * @description Controlador principal para gestionar las operaciones relacionadas con el modelo.
 */
export default class Controller<T, TNew, TUpdate> {
    detailsEnabled: boolean
    model: Model<T, TNew, TUpdate>
    detailModels: Detail[]
    payloadOptions: string[] = []

    /**
     * @constructor
     * @description Inicializa el controlador con propiedades por defecto.
     */
    constructor() {
        this.detailsEnabled = false
        this.model = new Model()
        this.detailModels = []
        this.payloadOptions = ['offset', 'limit', 'sort', 'details', 'directionsort', 'nofilterrls']
    }

    // General Operations

    /**
     * @method getModelProperties
     * @description Obtiene las propiedades del modelo actual.
     * @returns {IResponse} Respuesta con las propiedades del modelo.
     */
    public getModelProperties(): IResponse {
        try {
            const data = this.model.getModelProperties()
            return this.responseHandler({ data, message: 'Model properties retrieved successfully', statusCode: HttpStatusCodes.OK })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    /**
     * @method getAll
     * @description Recupera todos los registros con soporte para paginación y detalles adicionales.
     * @param {Request} req - Objeto de solicitud HTTP.
     * @returns {Promise<IResponse>} Respuesta con los registros solicitados.
     */
    public async getAll(req: Request): Promise<IResponse> {
        try {
            const params = parseHeaderParams(req.headers, this.payloadOptions)
            const { sort, offset, limit, details, directionsort, nofilterrls } = params
            const userId = await getUserId(req)

            let data = await this.model.getAll({ sort, offset, limit, userId, directionSort: directionsort, noFilterRLS: nofilterrls === 'true' })

            if (details && this.detailModels.length > 0) {
                data = await this.addDetails(data)
            }

            return this.responseHandler({ data, message: 'Data retrieved successfully', statusCode: HttpStatusCodes.OK })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    /**
     * @method getById
     * @description Recupera un registro específico por su ID.
     * @param {Request} req - Objeto de solicitud HTTP.
     * @returns {Promise<IResponse>} Respuesta con el registro solicitado.
     * @throws {MissingParameterError} Si el ID no está presente en la solicitud.
     * @throws {InvalidParameterTypeError} Si el ID no es un número válido.
     */
    public async getById(req: Request): Promise<IResponse> {
        try {
            if (!req.params.id) throw new MissingParameterError('id')

            const id = parseInt(req.params.id as string)

            if (isNaN(id)) throw new InvalidParameterTypeError('id', 'number')

            const params = parseHeaderParams(req.headers, this.payloadOptions)
            const { nofilterrls } = params
            const userId = await getUserId(req)
            const data = await this.model.getById(id, userId, { noFilterRLS: nofilterrls === 'true' })

            return this.responseHandler({ data, message: 'Data retrieved successfully', statusCode: HttpStatusCodes.OK })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    /**
     * @method getTotalRecords
     * @description Recupera el total de registros disponibles en el modelo.
     * @param {Request} req - Objeto de solicitud HTTP.
     * @returns {Promise<IResponse>} Respuesta con el total de registros.
     */
    public async getTotalRecords(req: Request): Promise<IResponse> {
        try {
            const params = parseHeaderParams(req.headers, this.payloadOptions)
            const { nofilterrls } = params
            const userId = await getUserId(req)
            const data = await this.model.getTotalRecords(userId, { noFilterRLS: nofilterrls === 'true' })
            return this.responseHandler({ data, message: 'Total records retrieved successfully', statusCode: HttpStatusCodes.OK })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    /**
     * @method search
     * @description Realiza una búsqueda con condiciones específicas, incluyendo paginación y detalles adicionales.
     * @param {Request} req - Objeto de solicitud HTTP.
     * @returns {Promise<IResponse>} Respuesta con los resultados de la búsqueda.
     * @throws {BadRequestError} Si las condiciones no son válidas.
     */
    public async search(req: Request): Promise<IResponse> {
        try {
            const params = parseHeaderParams(req.headers, this.payloadOptions.concat(['conditions']))
            const { conditions } = JSON.parse(params.conditions)
            const { sort, offset, limit, details, directionsort, nofilterrls } = params
            const validation = this.validateConditions(conditions)
            if (!validation.isValid) throw new BadRequestError(validation.errorMessage || 'No search conditions were sent', validation.errorDetails)

            const userId = await getUserId(req)

            let modelResponse = await this.model.search({
                conditions,
                sort,
                offset,
                limit,
                userId,
                directionSort: directionsort,
                noFilterRLS: nofilterrls === 'true',
            })
            if (details && this.detailModels.length > 0) {
                modelResponse = await this.addDetails(modelResponse)
            }
            return this.responseHandler({ data: modelResponse, message: 'Data retrieved successfully', statusCode: HttpStatusCodes.OK })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    /**
     * @method add
     * @description Agrega un nuevo registro al modelo.
     * @param {Request} req - Objeto de solicitud HTTP.
     * @returns {Promise<IResponse>} Respuesta con el registro insertado.
     */
    public async add(req: Request): Promise<IResponse> {
        try {
            const userId = await getUserId(req)
            const insertedRecord = await this.model.add(req.body, userId)
            return this.responseHandler({ data: insertedRecord, message: 'Record added successfully', statusCode: HttpStatusCodes.CREATED })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    /**
     * @method batchInsert
     * @description Agrega múltiples registros al modelo.
     * @param {Request} req - Objeto de solicitud HTTP.
     * @returns {Promise<IResponse>} Respuesta con los IDs de los registros insertados.
     */
    public async batchInsert(req: Request): Promise<IResponse> {
        try {
            const userId = await getUserId(req)
            const insertedIds = await this.model.batchInsert(req.body, userId)
            return this.responseHandler({ data: { insertedIds }, message: 'Records added successfully', statusCode: HttpStatusCodes.CREATED })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    /**
     * @method deleteById
     * @description Elimina un registro específico por su ID.
     * @param {Request} req - Objeto de solicitud HTTP.
     * @returns {Promise<IResponse>} Respuesta confirmando la eliminación.
     * @throws {MissingParameterError} Si el ID no está presente.
     * @throws {InvalidParameterTypeError} Si el ID no es un número válido.
     */
    public async deleteById(req: Request): Promise<IResponse> {
        try {
            if (!req.params.id) throw new MissingParameterError('id')

            const id = parseInt(req.params.id as string)

            if (isNaN(id)) throw new InvalidParameterTypeError('id', 'number')

            const deletedResponse = await this.model.deleteById(id)
            return this.responseHandler({ data: deletedResponse, message: 'Record deleted successfully', statusCode: HttpStatusCodes.OK })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    /**
     * @method deleteByCompositeKey
     * @description Elimina registros que coinciden con una clave compuesta.
     * @param {Request} req - Objeto de solicitud HTTP.
     * @returns {Promise<IResponse>} Respuesta confirmando la eliminación.
     * @throws {MissingParameterError} Si falta algún componente de la clave compuesta.
     * @throws {InvalidParameterTypeError} Si algún componente de la clave compuesta no es válido.
     */
    public async deleteByCompositeKey(req: Request): Promise<IResponse> {
        try {
            if (!req.params.firstId) throw new MissingParameterError('firstId')
            if (!req.params.secondId) throw new MissingParameterError('secondId')
            const firstId = parseInt(req.params.firstId as string)
            const secondId = parseInt(req.params.secondId as string)

            if (isNaN(firstId)) throw new InvalidParameterTypeError('firstId', 'number')
            if (isNaN(secondId)) throw new InvalidParameterTypeError('secondId', 'number')

            if (this.model.assignmentIds.length !== 2)
                throw new BusinessError('This function is not enabled for this entity', HttpStatusCodes.BAD_REQUEST)
            const deletedResponse = await this.model.deleteByCompositeKey(firstId, secondId)
            return this.responseHandler({ data: deletedResponse, message: 'Records deleted successfully', statusCode: HttpStatusCodes.OK })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    /**
     * @method deleteByCondition
     * @description Elimina registros basados en condiciones específicas.
     * @param {Request} req - Objeto de solicitud HTTP.
     * @returns {Promise<IResponse>} Respuesta confirmando la eliminación.
     * @throws {BadRequestError} Si las condiciones son inválidas.
     */
    public async deleteByCondition(req: Request): Promise<IResponse> {
        try {
            const params = parseHeaderParams(req.headers, [...this.payloadOptions, 'conditions'])
            const { conditions } = JSON.parse(params.conditions)
            const validation = this.validateConditions(conditions)
            if (!validation.isValid) throw new BadRequestError(validation.errorMessage || 'No search conditions were sent', validation.errorDetails)

            const modelResponse = await this.model.deleteByCondition(conditions)
            return this.responseHandler({ data: modelResponse, message: 'Records deleted successfully', statusCode: HttpStatusCodes.OK })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    /**
     * @method updateById
     * @description Actualiza un registro específico por su ID.
     * @param {Request} req - Objeto de solicitud HTTP.
     * @returns {Promise<IResponse>} Respuesta con el registro actualizado.
     * @throws {MissingParameterError} Si el ID no está presente.
     * @throws {InvalidParameterTypeError} Si el ID no es un número válido.
     */
    public async updateById(req: Request): Promise<IResponse> {
        try {
            if (!req.params.id) throw new MissingParameterError('id')

            const id = parseInt(req.params.id as string)

            if (isNaN(id)) throw new InvalidParameterTypeError('id', 'number')

            const userId = await getUserId(req)

            const updatedRecord = await this.model.updateById({ id, record: req.body, userId })
            return this.responseHandler({ data: updatedRecord, message: 'Record updated successfully', statusCode: HttpStatusCodes.OK })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    /**
     * @method multipleUpdate
     * @description Actualiza múltiples registros basados en condiciones específicas.
     * @param {Request} req - Objeto de solicitud HTTP.
     * @returns {Promise<IResponse>} Respuesta con los registros actualizados.
     * @throws {BadRequestError} Si las condiciones son inválidas.
     */
    async multipleUpdate(req: Request): Promise<IResponse> {
        try {
            const params = parseHeaderParams(req.headers, this.payloadOptions.concat(['conditions']))
            const userId = await getUserId(req)

            if (params.conditions) {
                const { conditions } = JSON.parse(params.conditions)
                const validation = this.validateConditions(conditions)
                if (!validation.isValid)
                    throw new BadRequestError(validation.errorMessage || 'No search conditions were sent', validation.errorDetails)

                const updateResponse = await this.model.multipleUpdate({ record: req.body, conditions, userId })
                return this.responseHandler({ data: updateResponse, message: 'Records updated successfully', statusCode: HttpStatusCodes.OK })
            } else {
                const { ids, data } = req.body
                const conditions = [{ field: this.model.tableId, value: ids, operator: 'IN' }]
                const updateResponse = await this.model.multipleUpdate({ record: data, conditions, userId })
                return this.responseHandler({ data: updateResponse, message: 'Records updated successfully', statusCode: HttpStatusCodes.OK })
            }
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    /**
     * @method getAffectedRecordsByQuery
     * @description Obtiene los registros afectados por una consulta específica.
     * @param {Request} req - Objeto de solicitud HTTP.
     * @returns {Promise<IResponse>} Respuesta con los registros afectados.
     * @throws {BadRequestError} Si las condiciones son inválidas.
     */
    async getAffectedRecordsByQuery(req: Request): Promise<IResponse> {
        try {
            const params = parseHeaderParams(req.headers, this.payloadOptions.concat(['conditions']))
            const { nofilterrls } = params
            if (params.conditions) {
                const { conditions } = JSON.parse(params.conditions)
                const validation = this.validateConditions(conditions)
                if (!validation.isValid)
                    throw new BadRequestError(validation.errorMessage || 'No search conditions were sent', validation.errorDetails)

                const userId = await getUserId(req)

                const affectedRecordsByQueryResponse = await this.model.getAffectedRecordsByQuery(conditions, userId, {
                    noFilterRLS: nofilterrls === 'true',
                })
                return this.responseHandler({
                    data: affectedRecordsByQueryResponse,
                    message: 'Records retrieved successfully',
                    statusCode: HttpStatusCodes.OK,
                })
            } else {
                const { ids } = req.body
                const conditions = [{ field: this.model.tableId, value: ids, operator: 'IN' }]
                const userId = await getUserId(req)
                const modelResponse = await this.model.getAffectedRecordsByQuery(conditions, userId, { noFilterRLS: nofilterrls === 'true' })
                return this.responseHandler({ data: modelResponse, message: 'Records retrieved successfully', statusCode: HttpStatusCodes.OK })
            }
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    // Controller Functions

    /**
     * @protected
     * @method addDetails
     * @description Agrega detalles adicionales a cada registro en función de los modelos de detalles especificados.
     * @param {Record<string, any>[]} data - Arreglo de registros principales a los cuales se les agregarán detalles.
     * @returns {Promise<Record<string, any>[]>} Registros con detalles adicionales agregados.
     */
    protected async addDetails(data: T[]): Promise<T[]> {
        data.forEach((record: any) => {
            this.detailModels.forEach((model) => {
                if (record[model.tableField]) {
                    if (!model.ids) model.ids = []
                    model.ids!.push(record[model.tableField])
                }
            })
        })
        const details = await this.getDetails(this.detailModels)
        data.forEach((record: any) => {
            this.detailModels.forEach((model) => {
                if (record[model.tableField]) {
                    record[model.modelName] = details[model.modelName].find(
                        (d: { [x: string]: any }) => d[model.tableField] == record[model.tableField],
                    )
                    delete record[model.tableField]
                }
            })
        })

        return data
    }

    /**
     * @protected
     * @method getDetails
     * @description Recupera detalles de otros modelos para los registros actuales.
     * @param {Detail[]} detailModels - Arreglo de modelos de detalles que contienen la información requerida para la consulta.
     * @returns {Promise<Record<string, any>>} Detalles de los modelos adicionales como un objeto con el nombre del modelo y sus datos.
     */
    protected async getDetails(detailModels: Detail[]): Promise<Record<string, any>> {
        const details: Record<string, any> = {}
        for (const model of detailModels) {
            const conditions: Condition[] = [
                {
                    field: model.tableField,
                    operator: 'in',
                    value: model.ids,
                },
            ]
            const data = await model.model.search({ conditions })
            details[model.modelName] = data
        }
        return details
    }

    /**
     * @protected
     * @method validateConditions
     * @description Valida las condiciones enviadas en la solicitud para asegurar que cumplen con el formato requerido.
     * @param {Condition[]} conditions - Condiciones a validar.
     * @returns {Object} Un objeto con `isValid` y detalles del error si la validación falla.
     */
    protected validateConditions(conditions: Condition[]) {
        const validation = {
            isValid: true,
            message: '',
            errorMessage: '',
            errorDetails: new Array<any>(),
        }
        if (conditions && conditions.length > 0) {
            conditions.forEach((condition) => {
                if (!this.isCondition(condition)) {
                    validation.errorDetails.push({
                        condition,
                        invalidCriteria: 'Must meet the condition format',
                        expectedValue: '{ field: string, value: any, operator?: string }',
                    })
                    validation.isValid = false
                }
                if (condition.operator == 'between') {
                    if (typeof condition.comparisonValue === 'undefined' || condition.comparisonValue == '') {
                        validation.errorDetails.push({
                            condition,
                            invalidCriteria: 'When using the between operator, two values are required',
                            expectedValue: '{ field: string, value: number, valueComparison: number, operator: "between" }',
                        })
                        validation.isValid = false
                    }
                }
            })
            if (!validation.isValid) validation.errorMessage = 'The minimum requirements for the request are not met'
        } else {
            validation.message = 'No search conditions were sent'
            validation.errorMessage = 'At least one search condition must be sent'
            validation.isValid = false
        }
        return validation
    }

    /**
     * @protected
     * @method isCondition
     * @description Verifica si el objeto dado cumple con la interfaz `Condition`.
     * @param {any} obj - Objeto a verificar.
     * @returns {boolean} `true` si el objeto es una condición válida, `false` en caso contrario.
     */
    protected isCondition(obj: any): obj is Condition {
        return obj.field !== undefined && obj.value !== undefined
    }

    /**
     * @protected
     * @method responseHandler
     * @description Construye y devuelve una respuesta estándar para las solicitudes exitosas.
     * @param {ResponseHandlerParams} params - Parámetros de la respuesta, incluyendo datos, mensaje y código de estado.
     * @returns {IResponse} Objeto de respuesta estructurado.
     */
    protected responseHandler({ data, message, statusCode, token, version }: ResponseHandlerParams): IResponse | IResponseToken {
        const response: IResponse = { message, statusCode }

        if (data) {
            response.data = data
        }

        if (token) {
            const tokenResponse = response as any
            tokenResponse.token = token
            tokenResponse.version = version
            return tokenResponse
        }

        return response
    }

    /**
     * @protected
     * @method errorHandler
     * @description Maneja y estructura la respuesta para diferentes tipos de errores.
     * @param {Error} error - Objeto de error capturado.
     * @returns {IResponse} Objeto de respuesta con detalles del error.
     */
    public errorHandler(error: Error): IResponse {
        let statusCode: HttpStatusCodesTypes = HttpStatusCodes.INTERNAL_SERVER_ERROR
        let errorMessage: string = 'An unexpected error occurred'
        let message: string = 'An unexpected error occurred'
        let errorDetails: any[] | undefined

        if (error instanceof InvalidParameterTypeError) {
            statusCode = error.statusCode
            errorMessage = error.message
            errorDetails = [{ parameter: error.parameterName, expectedType: error.expectedType }]
        } else if (error instanceof MissingParameterError) {
            statusCode = error.statusCode
            errorMessage = error.message
            errorDetails = [{ parameter: error.parameterName, issue: 'missing' }]
        } else if (error instanceof UnauthorizedError) {
            statusCode = error.statusCode
            errorMessage = error.message
        } else if (error instanceof BadRequestError) {
            statusCode = error.statusCode
            errorMessage = error.message
            errorDetails = error.errorDetails
        } else if (error instanceof BusinessError) {
            statusCode = error.statusCode
            errorMessage = error.message
        } else if (error instanceof InvalidStructureError) {
            statusCode = error.statusCode
            errorMessage = error.message
            errorDetails = error.invalidFields
        } else if (error instanceof DatabaseError) {
            statusCode = error.statusCode
            errorMessage = error.message
        } else if (error instanceof ResetPasswordTokenExpiredError) {
            statusCode = error.statusCode
            errorMessage = error.message
        } else if (error instanceof GenericError) {
            statusCode = error.statusCode
            errorMessage = error.message
        } else if (error instanceof FatalGenericError) {
            statusCode = error.statusCode
            errorMessage = error.message
        } else {
            // Captura de otros errores no específicos
            errorMessage = error.message
        }

        message = error.message

        return {
            message,
            statusCode,
            errorMessage,
            errorDetails,
        }
    }

    /**
     * @protected
     * @method sendEmail
     * @description Envía un correo electrónico utilizando Nodemailer.
     * @param {Email} email - Objeto que contiene los detalles del correo.
     * @returns {Promise<Error | nodemailer.SentMessageInfo | true>} Resultado del envío del correo.
     */
    protected async sendEmail(email: Email): Promise<Error | nodemailer.SentMessageInfo | true> {
        const transporter = nodemailer.createTransport(nodeMailerConfig)
        return await transporter.sendMail(email)
    }

    /**
     * @protected
     * @method generateRecoveryToken
     * @description Genera un token de recuperación JWT.
     * @param {number} userId - ID del usuario para el cual se genera el token.
     * @param {string} secret - Secreto para firmar el token JWT.
     * @returns {Promise<string>} Token de recuperación firmado.
     */
    protected async generateRecoveryToken(userId: number, secret: string) {
        return jwt.sign(
            {
                id: userId,
            },
            secret,
            {
                expiresIn: 900,
            },
        )
    }
}
