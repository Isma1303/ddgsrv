import { HttpStatusCodes, HttpStatusCodesTypes } from '../interfaces/http_status_codes'

export class InvalidParameterTypeError extends Error {
    public statusCode: HttpStatusCodesTypes
    public parameterName: string
    public expectedType: string

    constructor(parameterName: string, expectedType: string, message: string = '') {
        const defaultMessage = `The parameter ${parameterName} expects a ${expectedType}`
        super(message || defaultMessage)
        this.name = 'InvalidParameterTypeError'
        this.statusCode = HttpStatusCodes.BAD_REQUEST
        this.parameterName = parameterName
        this.expectedType = expectedType
        this.stack = new Error().stack
    }
}

export class NotFoundError extends Error {
    public statusCode: HttpStatusCodesTypes

    constructor(message: string = 'Record not found') {
        super(message)
        this.name = 'NotFoundError'
        this.statusCode = HttpStatusCodes.NOT_FOUND
        this.stack = new Error().stack
    }
}

export class MissingParameterError extends Error {
    public statusCode: HttpStatusCodesTypes
    public parameterName: string

    constructor(parameterName: string, message: string = '') {
        const defaultMessage = `The parameter ${parameterName} is required but was not provided.`
        super(message || defaultMessage)
        this.name = 'MissingParameterError'
        this.statusCode = HttpStatusCodes.BAD_REQUEST
        this.parameterName = parameterName
        this.stack = new Error().stack
    }
}

export class UnauthorizedError extends Error {
    public statusCode: HttpStatusCodesTypes

    constructor(message: string = 'User is not authenticated') {
        super(message)
        this.name = 'UnauthorizedError'
        this.statusCode = HttpStatusCodes.UNAUTHORIZED
        this.stack = new Error().stack
    }
}

export class BadRequestError extends Error {
    public statusCode: HttpStatusCodesTypes
    public errorDetails: any[]

    constructor(message: string = 'Bad request', errorDetails: any[] = []) {
        super(message)
        this.name = 'BadRequestError'
        this.statusCode = HttpStatusCodes.BAD_REQUEST
        this.errorDetails = errorDetails
        this.stack = new Error().stack
    }
}

export class ResetPasswordTokenExpiredError extends Error {
    public statusCode: HttpStatusCodesTypes

    constructor(message: string = 'Reset password token expired, please get a new one') {
        super(message)
        this.name = 'ResetPasswordTokenExpiredError'
        this.statusCode = HttpStatusCodes.BAD_REQUEST
        this.stack = new Error().stack
    }
}
