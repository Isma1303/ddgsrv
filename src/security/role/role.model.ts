import Model from '../../system/model'
import { IRole, IRoleNew, IRoleUpdate } from './role.interface'

export default class RoleModel extends Model<IRole, IRoleNew, IRoleUpdate> {
    constructor() {
        super()
        this.connectionName = 'DB_ADMIN'
        this.schemaName = 'admin'
        this.tableName = 'Roles'
        this.tableId = 'role_id'
        this.tableFields = [
            {
                name: 'role_id',
                description: 'Unique identifier for the roles table',
                required: false,
            },
            {
                name: 'role',
                description: 'Role name',
                required: false,
            },
            {
                name: 'status',
                description: 'Role status',
                required: false,
            },
        ]
        this.fieldNames = this.getFieldsString()
    }
}
