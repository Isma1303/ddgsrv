import Controller from '../../system/controller'
import { IAttendance, IAttendanceNew, IAttendanceUpdate } from './attendance.interface'
import { AttendanceModel } from './attendance.model'
export class AttendanceController extends Controller<IAttendance, IAttendanceNew, IAttendanceUpdate> {
    constructor() {
        super()
        this.model = new AttendanceModel()
    }
}
