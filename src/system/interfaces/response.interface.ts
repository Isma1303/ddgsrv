import { HttpStatusCodesTypes } from './http_status_codes'
export default interface Response {
    message: string
    statusCode: HttpStatusCodesTypes
    data?: Record<string, any> | Record<string, any>[]
    errorMessage?: string
    errorDetails?: any[]
    token?: string
    version?: string
}
