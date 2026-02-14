import { Controller } from "../../system/controller";
import { IAttendanceStatus, IAttendanceStatusNew, IAttendanceStatusUpdate } from "./attendance_status.interface";
import { AttendanceStatusModel } from "./attendance_status.model";

export class AttendanceStatusController extends Controller<IAttendanceStatus, IAttendanceStatusNew, IAttendanceStatusUpdate> {
    constructor() {
        super(new AttendanceStatusModel())
    }
}
