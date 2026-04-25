import Model from '../../system/model'
import { ISeviceEvent, IServiceEventNew, IServiceEventUpdate } from './service_event.interface'

export class ServiceEventModel extends Model<ISeviceEvent, IServiceEventNew, IServiceEventUpdate> {
    constructor() {
        super()
        this.schemaName = 'ddg'
        this.tableName = 'service_events'
        this.tableId = 'service_event_id'
        this.tableFields = [
            {
                name: 'service_event_id',
                description: 'ID del evento',
                required: false,
            },
            {
                name: 'service_nm',
                description: 'Nombre del evento',
                required: true,
            },
            {
                name: 'service_date',
                description: 'Fecha del evento',
                required: true,
            },
            {
                name: 'start_time',
                description: 'Hora de inicio',
                required: true,
            },
            {
                name: 'end_time',
                description: 'Hora de fin',
                required: true,
            },
            {
                name: 'is_active',
                description: 'Activo',
                required: true,
            },
            {
                name: 'department_id',
                description: 'Departamento',
                required: true,
            },
            {
                name: 'notes',
                description: 'Notas',
                required: false,
            },
        ]
    }
}
