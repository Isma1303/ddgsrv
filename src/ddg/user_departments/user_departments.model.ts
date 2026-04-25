import Model from '../../system/model'
import { IUserDepartment, IUserDepartmentNew, IUserDepartmentUpdate } from './user_departments.interface'

export class UserDepartmentsModel extends Model<IUserDepartment, IUserDepartmentNew, IUserDepartmentUpdate> {
    constructor() {
        super()
        this.schemaName = 'ddg'
        this.tableName = 'user_departments'
        this.tableId = 'department_id'
        this.tableAlias = 'ud'
        this.tableFields = [
            {
                name: 'department_id',
                description: 'Identificador del departamento',
                required: true,
            },
            {
                name: 'user_id',
                description: 'Identificador del usuario',
                required: true,
            },
        ]
    }
}
