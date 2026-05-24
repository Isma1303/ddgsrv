import Model from "../../../system/model";
import {
  IAttendanceStatus,
  IAttendanceStatusNew,
  IAttendanceStatusUpdate,
} from "./attendance_status.interface";

export class AttendanceStatusModel extends Model<
  IAttendanceStatus,
  IAttendanceStatusNew,
  IAttendanceStatusUpdate
> {
  constructor() {
    super();
    this.schemaName = "ddg";
    this.tableName = "attendance_status";
    this.tableId = "attendance_status_id";
    this.tableFields = [
      {
        name: "attendance_status_id",
        required: false,
        description: "Attendance Status Identifier",
      },
      {
        name: "attendance_status_cd",
        required: true,
        description: "Attendance Status Code",
      },
      {
        name: "attendance_status_nm",
        required: true,
        description: "Attendance Status Name",
      },
    ];
  }
}
