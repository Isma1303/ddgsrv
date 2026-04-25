import Controller from '../../system/controller'
import { ServiceEventModel } from './service_event.model'
import { ISeviceEvent, IServiceEventNew, IServiceEventUpdate } from './service_event.interface'

export class ServiceEventController extends Controller<ISeviceEvent, IServiceEventNew, IServiceEventUpdate> {
    constructor() {
        super()
        this.model = new ServiceEventModel()
    }
}
