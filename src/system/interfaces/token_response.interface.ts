import Response from './response.interface'

export interface ResponseToken extends Response {
    token: string
    version: string
}
