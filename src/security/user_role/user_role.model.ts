import Model from '../../system/model'
import { IRole } from '../role/role.interface'
import { IUser } from '../user/user.interface'
import { IUserRole, IUserRoleNew, IUserRoleUpdate, RoleByUser, UserByRole } from './user_role.interface'

export default class UserRoleModel extends Model<IUserRole, IUserRoleNew, IUserRoleUpdate> {
    constructor() {
        super()
        this.connectionName = 'DB_ADMIN'
        this.schemaName = 'admin'
        this.tableName = 'User_roles'
        this.assignmentIds = ['user_id', 'role_id']
        this.tableFields = [
            {
                name: 'user_id',
                description: 'Foreign key to user',
                required: true,
            },
            {
                name: 'role_id',
                description: 'Foreign key to role',
                required: true,
            },
        ]
        this.fieldNames = this.getFieldsString()
    }

    async getUsers(role_id: number): Promise<UserByRole[]> {
        try {
            const pool = await this.connection.getConnection(this.connectionName)
            const assignedUsersQuery = pool!.select('user_id', 'name').from(`${this.schemaName}.vw_user_roles`).where('role_id', role_id)

            const unassignedUsersQuery = pool!
                .select('a.user_id', 'a.name')
                .from(`${this.schemaName}.users as a`)
                .leftJoin(`${this.schemaName}.${this.tableName} as b`, function () {
                    this.on('a.user_id', '=', 'b.user_id').andOn('b.role_id', '=', pool!.raw('?', [role_id]))
                })
                .whereNull('b.role_id')

            const [assignedUsers, unassignedUsers] = await Promise.all([assignedUsersQuery, unassignedUsersQuery])

            const users = [
                ...assignedUsers.map((user: IUser) => ({ ...user, assigned: true })),
                ...unassignedUsers.map((user: IUser) => ({ ...user, assigned: false })),
            ]

            return users
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    async getRoles(user_id: number): Promise<RoleByUser[]> {
        try {
            const pool = await this.connection.getConnection(this.connectionName)
            const assignedRolesQuery = pool!.select('role_id', 'role').from(`${this.schemaName}.vw_user_roles`).where('user_id', user_id)

            const unassignedRolesQuery = pool!
                .select('a.role_id', 'a.role')
                .from(`${this.schemaName}.Roles as a`)
                .leftJoin(`${this.schemaName}.${this.tableName} as b`, function () {
                    this.on('a.role_id', '=', 'b.role_id').andOn('b.user_id', '=', pool!.raw('?', [user_id]))
                })
                .whereNull('b.user_id')

            const [assignedRoles, unassignedRoles] = await Promise.all([assignedRolesQuery, unassignedRolesQuery])

            const roles = [
                ...assignedRoles.map((role: IRole) => ({ ...role, assigned: true })),
                ...unassignedRoles.map((role: IRole) => ({ ...role, assigned: false })),
            ]

            return roles
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    async getAssignedRoles(user_id: number): Promise<IRole[]> {
        try {
            const pool = await this.connection.getConnection(this.connectionName)
            const assignedRoles = await pool!.select('role_id', 'role').from(`${this.schemaName}.vw_user_roles`).where('user_id', user_id)

            return assignedRoles
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }
}
