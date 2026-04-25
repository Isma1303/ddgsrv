import Model from '../../system/model'
import { IDepartmentMember, IDepartmentMemberNew, IDepartmentMemberUpdate } from './department_members.interface'

export class DepartmentMembersModel extends Model<IDepartmentMember, IDepartmentMemberNew, IDepartmentMemberUpdate> {
    constructor() {
        super()
        this.schemaName = 'ddg'
        this.tableName = 'department_members'
        this.tableId = 'department_member_id'
        this.tableFields = [
            {
                name: 'department_member_id',
                description: 'ID del miembro del departamento',
                required: false,
            },
            {
                name: 'department_id',
                description: 'ID del departamento',
                required: true,
            },
            {
                name: 'user_id',
                description: 'ID del usuario',
                required: true,
            },
            {
                name: 'reports_to',
                description: 'ID del usuario al que reporta',
                required: false,
            },
            {
                name: 'is_leader',
                description: 'Indica si el usuario es líder',
                required: true,
            },
        ]
    }
}
