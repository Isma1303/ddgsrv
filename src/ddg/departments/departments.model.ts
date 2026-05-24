import Model from "../../system/model";
import { IDepartment, IDepartmentNew, IDepartmentUpdate } from "./department.interface";


export class DepartmentModel extends Model<
  IDepartment,
  IDepartmentNew,
  IDepartmentUpdate
> {
  constructor() {
    super();
    this.schemaName = "ddg";
    this.tableName = "departments";
    this.tableId = "department_id";
    this.tableAlias = "deps";
    this.tableFields = [
      {
        name: "department_id",
        description: "Identificador del departamento",
        required: false,
      },
      {
        name: "department_nm",
        description: "Nombre del departamento",
        required: true,
      },
    ];
  }
}
