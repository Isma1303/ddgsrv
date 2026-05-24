import Model from "../../system/model";
import { IDepartmentMember, IDepartmentMemberNew, IDepartmentMemberUpdate } from "./department_members.interface";

export class DepartmentMembersModel extends Model<IDepartmentMember, IDepartmentMemberNew, IDepartmentMemberUpdate> {
    constructor() {
        super();
        this.schemaName = 'ddg';
        this.tableName = 'department_members';
        this.tableId = 'department_member_id';
        this.tableAlias = 'dm';
        this.tableFields = [
            {
                name: 'department_member_id',
                description: 'Id del registro',
                required: true
            },
            {
                name: 'department_id',
                description: 'Id del departamento',
                required: true
            },
            {
                name: 'user_id',
                description: 'Id del usuario',
                required: true
            },
            {
                name: 'reports_to',
                description: 'Id del usuario al que reporta',
                required: true
            },
            {
                name: 'is_leader',
                description: 'Indica si el usuario es lider del departamento',
                required: true
            }
        ]
    }
}