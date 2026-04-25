import Model from '../../system/model'
import { IDepartments, IDepartmentsNew, IDepartmentsUpdate } from './departments.interface'

export class DepartmentsModel extends Model<IDepartments, IDepartmentsNew, IDepartmentsUpdate> {
    constructor() {
        super()
        this.schemaName = 'ddg'
        this.tableName = 'departments'
        this.tableId = 'department_id'
        this.tableAlias = 'deps'
        this.tableFields = [
            {
                name: 'department_id',
                description: 'Identificador del departamento',
                required: false,
            },
            {
                name: 'department_nm',
                description: 'Nombre del departamento',
                required: true,
            },
            {
                name: 'is_active',
                description: 'Estado del departamento',
                required: true,
            },
        ]
    }
}
