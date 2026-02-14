import { Model } from "../../system/model";
import { IAttendanceStatus, IAttendanceStatusNew, IAttendanceStatusUpdate } from "./attendance_status.interface";

export class AttendanceStatusModel extends Model<IAttendanceStatus, IAttendanceStatusNew, IAttendanceStatusUpdate> {
    constructor() {
        super()
        this.tableSchema = 'ddg'
        this.tableName = 'attendance_status'
        this.tableKey = 'attendance_status_id'
        this.tableColumns = [
            {
                field: 'attendance_status_id',
                required: false,
                description: 'Attendance Status Identifier',
                type: 'number'
            },
            {
                field: 'attendance_status_cd',
                required: true,
                description: 'Attendance Status Code',
                type: 'string'
            },
            {
                field: 'attendance_status_nm',
                required: true,
                description: 'Attendance Status Name',
                type: 'string'
            }
        ]
    }
}
