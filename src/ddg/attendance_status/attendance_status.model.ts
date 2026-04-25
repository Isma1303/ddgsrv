import Model from '../../system/model'
import { IAttendanceStatus, IAttendanceStatusNew, IAttendanceStatusUpdate } from './attendance_status.interface'

export class AttendanceStatusModel extends Model<IAttendanceStatus, IAttendanceStatusNew, IAttendanceStatusUpdate> {
    constructor() {
        super()
        this.schemaName = 'ddg'
        this.tableName = 'attendance_status'
        this.tableId = 'attendance_status_id'
        this.tableFields = [
            {
                name: 'attendance_status_id',
                description: 'ID del estado de asistencia',
                required: false,
            },
            {
                name: 'attendance_status_cd',
                description: 'Código del estado de asistencia',
                required: true,
            },
            {
                name: 'attendance_status_nm',
                description: 'Nombre del estado de asistencia',
                required: true,
            },
        ]
    }
}
