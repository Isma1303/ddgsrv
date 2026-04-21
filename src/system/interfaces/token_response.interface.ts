import IResponse from './response.interface'

export interface IResponseToken extends IResponse {
    token: string
    version: string
}
