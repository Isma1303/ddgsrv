import Model from '../../system/model'
import { IAttendance, IAttendanceNew, IAttendanceUpdate } from './attendance.interface'

export class AttendanceModel extends Model<IAttendance, IAttendanceNew, IAttendanceUpdate> {
    constructor() {
        super()
        this.schemaName = 'ddg'
        this.tableName = 'attendances'
        this.tableId = 'attendance_id'
        this.tableFields = [
            {
                name: 'attendance_id',
                description: 'ID de la asistencia',
                required: false,
            },
            {
                name: 'service_event_id',
                description: 'ID del evento',
                required: true,
            },
            {
                name: 'user_id',
                description: 'ID del usuario',
                required: true,
            },
            {
                name: 'attendance_status_id',
                description: 'ID del estado de la asistencia',
                required: true,
            },
            {
                name: 'user_id',
                description: 'ID del usuario',
                required: true,
            },
            {
                name: 'attendance_status_id',
                description: 'ID del estado de la asistencia',
                required: true,
            },
            {
                name: 'notes',
                description: 'Notas de la asistencia',
                required: false,
            },
        ]
    }
}
