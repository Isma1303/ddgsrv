import { HttpStatusCodesTypes } from './http_status_codes'
export interface ResponseHandlerParams {
    data?: any
    message: string
    statusCode: HttpStatusCodesTypes
    token?: string
    version?: string
}
