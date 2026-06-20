import { Model } from "../../system/model";
import { IDepartment, IDepartmentNew, IDepartmentUpdate } from "./department.interface";

export class DepartmentModel extends Model<IDepartment, IDepartmentNew, IDepartmentUpdate> {
    constructor() {
        super()
        this.tableSchema = 'ddg'
        this.tableName = 'departments'
        this.tableKey = 'department_id'
        this.tableColumns = [
            {
                field: 'department_id',
                required: false,
                description: 'Department Identifier',
                type: 'number'
            },
            {
                field: 'department_nm',
                required: true,
                description: 'Department Name',
                type: 'string'
            },
            {
                field: 'is_active',
                required: true,
                description: 'Department Active Status',
                type: 'boolean'
            }
        ]
    }
}
