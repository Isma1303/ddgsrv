import { Controller } from "../../../system/controller";
import { IAttendance } from "./users_attendance.interface";
import { AttendanceModel } from "./users_attendance.model";

export class AttendanceController extends Controller<
  IAttendance,
  never,
  never
> {
  constructor() {
    super(new AttendanceModel());
  }
}
