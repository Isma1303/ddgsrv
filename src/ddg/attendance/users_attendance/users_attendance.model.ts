import Model from "../../../system/model";
import { IAttendance } from "./users_attendance.interface";

export class AttendanceModel extends Model<
  IAttendance,
  IAttendance,
  IAttendance
> {
  constructor() {
    super();
    this.schemaName = "ddg";
    this.tableName = "attendances";
    this.tableAlias = "a";
    this.tableId = "user_id";
    this.tableFields = [
      {
        name: "service_event_id",
        description: "service_event_id",
        required: true,
      },
      {
        name: "user_id",
        description: "user_id",
        required: true,
      },
      {
        name: "attendance_status_id",
        description: "attendance_status_id",
        required: true,
      },
      {
        name: "notes",
        description: "notes",
        required: false,
      },
    ];
  }
}
