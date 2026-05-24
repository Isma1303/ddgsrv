export interface IAttendance {
  service_event_id: number;
  user_id: number;
  attendance_status_id: number;
  notes?: string;
}
