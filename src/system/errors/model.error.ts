import { HttpStatusCodes, HttpStatusCodesTypes } from '../interfaces/http_status_codes'
import { InvalidField } from '../interfaces/model.interface'

export class DatabaseError extends Error {
    public statusCode: HttpStatusCodesTypes

    constructor(message: string, statusCode: HttpStatusCodesTypes = HttpStatusCodes.INTERNAL_SERVER_ERROR) {
        super(message)
        this.name = 'DatabaseError'
        this.message = message
        this.statusCode = statusCode
        this.stack = new Error().stack
    }
}

export class InvalidStructureError extends Error {
    public statusCode: HttpStatusCodesTypes
    public invalidFields: InvalidField[]

    constructor(message: string, invalidFields: InvalidField[]) {
        super(message)
        this.name = 'InvalidStructureError'
        this.message = message
        this.invalidFields = invalidFields
        this.statusCode = HttpStatusCodes.BAD_REQUEST
        this.stack = new Error().stack
    }
}

export class BusinessError extends Error {
    public statusCode: HttpStatusCodesTypes

    constructor(message: string, statusCode: HttpStatusCodesTypes = HttpStatusCodes.BAD_REQUEST) {
        super(message)
        this.name = 'BusinessError'
        this.message = message
        this.statusCode = statusCode
        this.stack = new Error().stack
    }
}
