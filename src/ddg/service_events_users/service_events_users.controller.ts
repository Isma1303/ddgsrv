import Controller from '../../system/controller'
import { IServiceEventsUsers, IServiceEventsUsersNew, IServiceEventsUsersUpdate } from './service_events_users.interface'
import { ServiceEventsUsersModel } from './service_events_users.model'

export class ServiceEventsUsersController extends Controller<IServiceEventsUsers, IServiceEventsUsersNew, IServiceEventsUsersUpdate> {
    constructor() {
        super()
        this.model = new ServiceEventsUsersModel()
    }
}
