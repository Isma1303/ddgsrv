<<<<<<< Updated upstream
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
import productCategorieRoure from "../coffe/product_categories/product_categorie.route";
import productRoutes from "../coffe/products/products.route";
import menuRoutes from "../coffe/menus/menus.route";
import menuSectionRoutes from "../coffe/menu_sections/menu_sections.route";
import menuItemRoutes from "../coffe/menu_items/menu_items.route";
import saleRoutes from "../coffe/sales/sales.route";
import saleLineRoutes from "../coffe/sale_lines/sale_lines.route";
import userCardRoutes from "../ddg/user_cards/user_card.route";

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
router.use("/ddg/user-cards", userCardRoutes);
router.use("/coffee/product-categories", productCategorieRoure);
router.use("/coffee/products", productRoutes);
router.use("/coffee/menus", menuRoutes);
router.use("/coffee/menu-sections", menuSectionRoutes);
router.use("/coffee/menu-items", menuItemRoutes);
router.use("/coffee/sales", saleRoutes);
router.use("/coffee/sale-lines", saleLineRoutes);

export default router;
=======
import { Router, Request, Response } from 'express'
import { btoa } from './utils/crypt.utils'
import Route from '../system/interfaces/route.interface'

<<<<<<< HEAD
import actionRouter from "../security/action/action.route";
import configurationRouter from "../security/configuration/configuration.route";
import menuOptionRouter from "../security/menu_option/menu_option.route";
import roleTableRecordRouter from "../security/table_role_record/table_role_record.route";
import roleRouter from "../security/role/role.route";
import roleActionRouter from "../security/role_action/role_action.route";
import roleMenuOptionRouter from "../security/role_menu_option/role_menu_option.route";
import tableRouter from "../security/table/table.route";
import userRouter from "../security/user/user.route";
import userRoleRouter from "../security/user_role/user_role.route";
import systemActionRoute from "../security/system_action/system_action.route";
import roleSystemActionRouter from "../security/role_system_action/role_system_action.route";
import workerRunningJobRouter from "../security/Worker_running_jobs/worker_running_job.route";

=======
import actionRouter from '../security/action/action.route'
import configurationRouter from '../security/configuration/configuration.route'
import menuOptionRouter from '../security/menu_option/menu_option.route'
import roleTableRecordRouter from '../security/table_role_record/table_role_record.route'
import roleRouter from '../security/role/role.route'
import roleActionRouter from '../security/role_action/role_action.route'
import roleMenuOptionRouter from '../security/role_menu_option/role_menu_option.route'
import tableRouter from '../security/table/table.route'
import userRouter from '../security/user/user.route'
import userRoleRouter from '../security/user_role/user_role.route'
import systemActionRoute from '../security/system_action/system_action.route'
import roleSystemActionRouter from '../security/role_system_action/role_system_action.route'
import workerRunningJobRouter from '../security/Worker_running_jobs/worker_running_job.route'
import departmentsRouter from '../ddg/departments/departments.route'
import attendanceRouter from '../ddg/attendance/attendance.route'
import departmentMembersRouter from '../ddg/department_members/department_members.route'
import serviceEventRouter from '../ddg/service_events/service_event.route'
import attendanceStatusRouter from '../ddg/attendance_status/attendance_status.route'
import userCardRouter from '../ddg/user_cards/user_card.route'
import serviceEventsUsersRouter from '../ddg/service_events_users/service_events_users.route'
import userDepartmentsRouter from '../ddg/user_departments/user_departments.route'
import salesRouter from '../coffee/sales/sales.route'
import productRouter from '../coffee/products/product.route'
import productCategoriesRouter from '../coffee/product_categories/product_categories.route'
import saleStatusRouter from '../coffee/sale_status/sale_status.route'
import saleDetailRouter from '../coffee/sale_detail/sale_detail.route'
>>>>>>> parent of d71d1f2 (refactor: restructure security module, migrate system utilities, and clean up legacy coffee service files)

const endPoint = '/api/v1'
const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Bienvenido al API de codeliq',
        // _links: {
        //     self: {
        //         href: `${config.URL_PROD || config.URL_DEV}`,
        //     },
        //     documentacion: {
        //         href: `${config.URL_PROD || config.URL_DEV}/docs`,
        //     },
        // },
    })
})

router.get('/encrypt/:value', async (req: Request, res: Response) => {
    return res.status(200).json({ value: req.params.value, encrypted: btoa(req.params.value as string) })
})

router.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'API is healthy' })
})

const generalRoutes: Route = { endPoint, router }

export const routes: Route[] = [
<<<<<<< HEAD
  generalRoutes,
  actionRouter,
  configurationRouter,
  menuOptionRouter,
  roleTableRecordRouter,
  roleRouter,
  roleActionRouter,
  roleMenuOptionRouter,
  tableRouter,
  userRouter,
  userRoleRouter,
  systemActionRoute,
  roleSystemActionRouter,
  workerRunningJobRouter,

=======
    generalRoutes,
    actionRouter,
    configurationRouter,
    menuOptionRouter,
    roleTableRecordRouter,
    roleRouter,
    roleActionRouter,
    roleMenuOptionRouter,
    tableRouter,
    userRouter,
    userRoleRouter,
    systemActionRoute,
    roleSystemActionRouter,
    workerRunningJobRouter,
    departmentsRouter,
    attendanceRouter,
    departmentMembersRouter,
    serviceEventRouter,
    attendanceStatusRouter,
    userCardRouter,
    serviceEventsUsersRouter,
    userDepartmentsRouter,
    salesRouter,
    productRouter,
    productCategoriesRouter,
    saleStatusRouter,
    saleDetailRouter,
>>>>>>> parent of d71d1f2 (refactor: restructure security module, migrate system utilities, and clean up legacy coffee service files)
].map((r) => {
    if (r.endPoint.startsWith('/api/v1')) return r
    return { ...r, endPoint: `/api/v1${r.endPoint}` }
})
>>>>>>> Stashed changes
