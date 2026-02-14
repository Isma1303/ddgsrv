import { Model } from "./model"
import { HttpResponseStatus } from "./shared/interfaces/http-response.interface"
import { Request, Response } from "express"

export class Controller<T, TNew, TUpdate> {
    model: Model<T, TNew, TUpdate>

    constructor(model: Model<T, TNew, TUpdate>) {
        this.model = model
    }

    async create(req: Request) {
        try {
            const data: T = req.body
            const response = await this.model.create(data as any)
            return {
                status: HttpResponseStatus.CREATED,
                data: response,
                message: 'Created'
            }

        } catch (error) {
            return {
                status: HttpResponseStatus.INTERNAL_SERVER_ERROR,
                error: error,
                message: 'Internal Server Error'
            }
        }
    }

    async getById(req: Request) {
        try {
            const { id } = req.params
            const response = await this.model.getById(id as any)
            return {
                status: HttpResponseStatus.OK,
                data: response,
                message: 'OK'
            }
        } catch (error) {
            return {
                status: HttpResponseStatus.INTERNAL_SERVER_ERROR,
                error: error,
                message: 'Internal Server Error'
            }
        }
    }

    async update(req: Request) {
        try {
            const { id, data } = req.body
            const response = await this.model.update(id, data)
            return {
                status: HttpResponseStatus.OK,
                data: response,
                message: 'OK'
            }
        } catch (error) {
            return {
                status: HttpResponseStatus.INTERNAL_SERVER_ERROR,
                error: error,
                message: 'Internal Server Error'
            }
        }
    }

    async delete(req: Request) {
        try {
            const { id } = req.params
            const response = await this.model.delete(id as any)
            return {
                status: HttpResponseStatus.OK,
                data: response,
                message: 'OK'
            }
        } catch (error) {
            return {
                status: HttpResponseStatus.INTERNAL_SERVER_ERROR,
                error: error,
                message: 'Internal Server Error'
            }
        }
    }

    async getAll() {
        try {
            const response = await this.model.getAll()
            return {
                status: HttpResponseStatus.OK,
                data: response,
                message: 'OK'
            }
        } catch (error) {
            return {
                status: HttpResponseStatus.INTERNAL_SERVER_ERROR,
                error: error,
                message: 'Internal Server Error'
            }
        }
    }
}