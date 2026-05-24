import { Router, Request, Response } from "express";
import { btoa } from "./utils/crypt.utils";
import Route from "../system/interfaces/route.interface";

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
import departmentsRouter from "../ddg/departments/departments.route";
import departmentMembersRouter from "../ddg/department_members/department_members.route";
import serviceEventsUsersRouter from "../ddg/service_events_users/service_events_users.route";
import salesRouter from "../coffee/sales/sales.route";
import productRouter from "../coffee/products/product.route";
import saleStatusRouter from "../coffee/sale_status/sale_status.route";
import saleDetailRouter from "../coffee/sale_detail/sale_detail.route";
import productCategoriesRouter from "../coffee/product_categories/product_categories.route";
import userCardRouter from "../ddg/user_cards/user_card.route";

const endPoint = "/api/v1";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Bienvenido al API de codeliq",
    // _links: {
    //     self: {
    //         href: `${config.URL_PROD || config.URL_DEV}`,
    //     },
    //     documentacion: {
    //         href: `${config.URL_PROD || config.URL_DEV}/docs`,
    //     },
    // },
  });
});

router.get("/encrypt/:value", async (req: Request, res: Response) => {
  return res.status(200).json({
    value: req.params.value,
    encrypted: btoa(req.params.value as string),
  });
});

router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "API is healthy" });
});

const generalRoutes: Route = { endPoint, router };

export const routes: Route[] = [
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
  departmentMembersRouter,
  userCardRouter,
  serviceEventsUsersRouter,
  salesRouter,
  productRouter,
  productCategoriesRouter,
  saleStatusRouter,
  saleDetailRouter,
].map((r) => {
  if (r.endPoint.startsWith("/api/v1")) return r;
  return { ...r, endPoint: `/api/v1${r.endPoint}` };
});
