import { Model } from "../../../system/model";
import { IAttendance } from "./users_attendance.interface";

export class AttendanceModel extends Model<IAttendance, never, never> {
  constructor() {
    super();
    this.tableSchema = "ddg";
    this.tableName = "attendance";
    this.tableAlias = "a";
    this.tableKey = "user_id";
    this.tableColumns = [
      {
        field: "service_event_id",
        description: "service_event_id",
        type: "number",
        required: true,
      },
      {
        field: "user_id",
        description: "user_id",
        type: "number",
        required: true,
      },
      {
        field: "attendance_status_id",
        description: "attendance_status_id",
        type: "number",
        required: true,
      },
      {
        field: "notes",
        description: "notes",
        type: "string",
        required: false,
      },
    ];
  }
}
