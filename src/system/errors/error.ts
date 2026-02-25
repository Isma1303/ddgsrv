import { HttpStatusCodes, HttpStatusCodesTypes } from '../interfaces/http_status_codes'

export class GenericError extends Error {
    public statusCode: HttpStatusCodesTypes

    constructor(message: string = 'An error occurred', statusCode: HttpStatusCodesTypes = HttpStatusCodes.BAD_REQUEST) {
        super(message)
        this.name = 'GenericError'
        this.statusCode = statusCode
        this.stack = new Error().stack
    }
}

export class FatalGenericError extends Error {
    public statusCode: HttpStatusCodesTypes

    constructor(message: string = 'An error occurred', statusCode: HttpStatusCodesTypes = HttpStatusCodes.INTERNAL_SERVER_ERROR) {
        super(message)
        this.name = 'FatalGenericError'
        this.statusCode = statusCode
        this.stack = new Error().stack
    }
}
