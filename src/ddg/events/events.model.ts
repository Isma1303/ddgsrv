import { Model } from "../../system/model";
import { IEvent, IEventNew, IEventUpdate } from "./events.interface";

export class EventsModel extends Model<IEvent, IEventNew, IEventUpdate> {
    constructor() {
        super()
        this.tableSchema = 'ddg'
        this.tableName = 'service_event'
        this.tableKey = 'service_event_id'
        this.tableColumns = [
            {
                field: 'service_event_id',
                required: false,
                description: 'Service Event Identifier',
                type: 'number'
            },
            {
                field: 'service_nm',
                required: true,
                description: 'Service Name',
                type: 'string'
            },
            {
                field: 'service_date',
                required: true,
                description: 'Service Date',
                type: 'datetime'
            },
            {
                field: 'start_time',
                required: true,
                description: 'Start Time',
                type: 'string'
            },
            {
                field: 'end_time',
                required: true,
                description: 'End Time',
                type: 'datetime'
            },
            {
                field: 'is_active',
                required: true,
                description: 'Service Event Active Status',
                type: 'boolean'
            }
        ]
    }
}
