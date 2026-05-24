import Controller from "../../system/controller";
import {
  IDepartment,
  IDepartmentNew,
  IDepartmentUpdate,
} from "./department.interface";
import { DepartmentModel } from "./departments.model";

export class DepartmentController extends Controller<
  IDepartment,
  IDepartmentNew,
  IDepartmentUpdate
> {
  constructor() {
    super();
    this.model = new DepartmentModel();
  }
}
