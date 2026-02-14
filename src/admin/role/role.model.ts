import { Model } from "../../system/model";
import { IRole, IRoleNew, IRoleUpdate } from "./role.interface";

export class RoleModel extends Model<IRole,
    IRoleNew,
    IRoleUpdate> {
    constructor() {
        super()
        this.tableSchema = 'admin'
        this.tableAlias = 'r'
        this.tableName = 'role'
        this.tableKey = 'role_id'
        this.tableColumns = [
            {
                field: 'role_id',
                required: false,
                description: 'Role identifired',
                type: 'number'
            },
            {
                field: 'role_nm',
                required: true,
                description: 'Role name',
                type: 'string'
            }
        ]
    }
}