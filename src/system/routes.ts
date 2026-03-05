import { Router } from "express";
import userRoutes from "../admin/auth/user.route";
import roleRoutes from "../admin/role/role.route";
import configurationRotes from "../admin/configuration/configuration.route";
import eventRoutes from "../ddg/events/events.route";
import departmentRoutes from "../ddg/departments/department.route";
import attendanceStatusRoutes from "../ddg/attendance/attendance_status/attendance_status.route";
import assignamentRoutes from "../admin/assignaments/assignament.route";
import dashboardRoutes from "../ddg/dashboard/dashboard.route";
import attendanceRoute from "../ddg/attendance/users_attendance/users_attendance.route";

const router = Router();

router.use("/admin/auth", userRoutes);
router.use("/admin/role", roleRoutes);
router.use("/admin/assignament", assignamentRoutes);
router.use("/admin/configuration", configurationRotes);
router.use("/ddg/events", eventRoutes);
router.use("/ddg/departments", departmentRoutes);
router.use("/ddg/attendance-status", attendanceStatusRoutes);
router.use("/ddg/dashboard", dashboardRoutes);
router.use("/ddg/attendance", attendanceRoute);

export default router;
