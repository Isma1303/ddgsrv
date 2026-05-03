import Controller from '../../system/controller'
import IResponse from '../../system/interfaces/response.interface'
import { IServiceEventsUsers, IServiceEventsUsersNew, IServiceEventsUsersUpdate } from './service_events_users.interface'
import { ServiceEventsUsersModel } from './service_events_users.model'
import { Request } from 'express'

export class ServiceEventsUsersController extends Controller<IServiceEventsUsers, IServiceEventsUsersNew, IServiceEventsUsersUpdate> {
    constructor() {
        super()
        this.model = new ServiceEventsUsersModel()
    }

    public async deleteUserFromService(req: Request): Promise<IResponse> {
        try {
            const { service_event_id, user_id } = req.body
            await (this.model as ServiceEventsUsersModel).deleteUserFromService(service_event_id, user_id)
            return {
                message: 'Usuario eliminado del servicio',
                statusCode: 200,
                data: [],
            }
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }
}
