import Model from '../../system/model'
import { IServiceEventsUsers, IServiceEventsUsersNew, IServiceEventsUsersUpdate } from './service_events_users.interface'

export class ServiceEventsUsersModel extends Model<IServiceEventsUsers, IServiceEventsUsersNew, IServiceEventsUsersUpdate> {
    constructor() {
        super()
        this.schemaName = 'ddg'
        this.tableName = 'service_events_users'
        this.tableId = 'service_event_id'
        this.tableAlias = 'seu'
        this.tableFields = [
            {
                name: 'service_event_id',
                description: 'Identificador del evento de servicio',
                required: true,
            },
            {
                name: 'user_id',
                description: 'Identificador del usuario',
                required: true,
            },
        ]
    }
}
