import Model from '../../system/model'
import { Knex } from 'knex'
import { ISystemActionByRole, IRoleBySystemAction, IRoleSystemActionNew } from './role_system_action.interface'
import { IRole } from '../role/role.interface'
import { ISystemAction } from '../system_action/system_action.interface'

export default class RoleSystemActionModel<T, TNew, TUpdate> extends Model<T, TNew, TUpdate> {
    constructor() {
        super()
        this.connectionName = 'DB_ADMIN'
        this.schemaName = 'admin'
        this.tableName = 'Roles_system_actions'
        this.assignmentIds = ['role_id', 'system_action_id']
        this.tableFields = [
            {
                name: 'role_id',
                description: 'Foreign key to Role',
                required: true,
            },
            {
                name: 'system_action_id',
                description: 'Foreign key to System Action',
                required: true,
            },
        ]
        this.fieldNames = this.getFieldsString()
    }

    async getSystemActions(role_id: number): Promise<ISystemActionByRole[]> {
        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)

            const assignedActions = (
                await pool
                    .select(
                        'A.system_action_id',
                        'A.system_action_name',
                        'A.component_id',
                        'A.module_name',
                        'A.route_path',
                        'A.http_method',
                        'A.action_type',
                        'A.priority',
                        'A.description',
                        'A.is_active',
                    )
                    .from(`${this.schemaName}.System_actions AS A`)
                    .innerJoin(`${this.schemaName}.${this.tableName} AS B`, 'A.system_action_id', 'B.system_action_id')
                    .where('B.role_id', role_id)
                    .andWhere('A.is_active', 1)
                    .orderBy('A.system_action_name', 'asc')
            ).map((action: ISystemAction) => ({
                ...action,
                assigned: true,
            }))

            const unassignedActions = (
                await pool
                    .select(
                        'A.system_action_id',
                        'A.system_action_name',
                        'A.component_id',
                        'A.module_name',
                        'A.route_path',
                        'A.http_method',
                        'A.action_type',
                        'A.priority',
                        'A.description',
                        'A.is_active',
                    )
                    .from(`${this.schemaName}.System_actions AS A`)
                    .leftJoin(`${this.schemaName}.${this.tableName} AS B`, function () {
                        this.on('A.system_action_id', '=', 'B.system_action_id').andOn('B.role_id', '=', pool.raw('?', [role_id]))
                    })
                    .whereNull('B.system_action_id')
                    .andWhere('A.is_active', 1)
                    .orderBy('A.system_action_name', 'asc')
            ).map((action: ISystemAction) => ({
                ...action,
                assigned: false,
            }))

            return [...assignedActions, ...unassignedActions]
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    async getRoles(system_action_id: number): Promise<IRoleBySystemAction[]> {
        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)

            const assignedRoles = (
                await pool
                    .select('A.role_id', 'A.role')
                    .from(`${this.schemaName}.Roles AS A`)
                    .innerJoin(`${this.schemaName}.${this.tableName} AS B`, 'A.role_id', 'B.role_id')
                    .where('B.system_action_id', system_action_id)
            ).map((role: IRole) => ({
                ...role,
                assigned: true,
            }))

            const unassignedRoles = (
                await pool
                    .select('A.role_id', 'A.role')
                    .from(`${this.schemaName}.Roles AS A`)
                    .leftJoin(`${this.schemaName}.${this.tableName} as B`, function () {
                        this.on('B.role_id', '=', 'B.role_id').andOn('B.system_action_id', '=', pool.raw('?', [system_action_id]))
                    })
                    .whereNull('B.system_action_id')
            ).map((role: IRole) => ({
                ...role,
                assigned: false,
            }))

            return [...assignedRoles, ...unassignedRoles]
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    async getSystemActionsByName(role_id: number, system_action_name: string): Promise<ISystemActionByRole[]> {
        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)

            const assignedActions = (
                await pool
                    .select(
                        'A.system_action_id',
                        'A.system_action_name',
                        'A.component_id',
                        'A.module_name',
                        'A.route_path',
                        'A.http_method',
                        'A.action_type',
                        'A.priority',
                        'A.description',
                        'A.is_active',
                    )
                    .from(`${this.schemaName}.System_actions AS A`)
                    .innerJoin(`${this.schemaName}.${this.tableName} AS B`, 'A.system_action_id', 'B.system_action_id')
                    .where('B.role_id', role_id)
                    .andWhere('A.is_active', 1)
                    .andWhereRaw('A.system_action_name LIKE ?', [`%${system_action_name}%`])
                    .orderBy('A.system_action_name', 'asc')
            ).map((action: ISystemAction) => ({
                ...action,
                assigned: true,
            }))

            const unassignedActions = (
                await pool
                    .select(
                        'A.system_action_id',
                        'A.system_action_name',
                        'A.component_id',
                        'A.module_name',
                        'A.route_path',
                        'A.http_method',
                        'A.action_type',
                        'A.priority',
                        'A.description',
                        'A.is_active',
                    )
                    .from(`${this.schemaName}.System_actions AS A`)
                    .leftJoin(`${this.schemaName}.${this.tableName} AS B`, function () {
                        this.on('A.system_action_id', '=', 'B.system_action_id').andOn('B.role_id', '=', pool.raw('?', [role_id]))
                    })
                    .whereNull('B.system_action_id')
                    .andWhere('A.is_active', 1)
                    .andWhereRaw('A.system_action_name LIKE ?', [`%${system_action_name}%`])
                    .orderBy('A.system_action_name', 'asc')
            ).map((action: ISystemAction) => ({
                ...action,
                assigned: false,
            }))

            return [...assignedActions, ...unassignedActions]
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    async createSystemActionsAssignments(
        assignmentsData: IRoleSystemActionNew[],
        roleId: number,
    ): Promise<{ count_inserted: number; role_id: number }> {
        const pool: Knex = await this.connection.getConnection(this.connectionName)
        const transaction = await pool.transaction()
        try {
            await transaction.del().from(`${this.schemaName}.${this.tableName}`).where('role_id', roleId)

            if (assignmentsData.length > 0) {
                const query = transaction.insert(assignmentsData).into(`${this.schemaName}.${this.tableName}`)
                await query
            }
            const resultInsert = { count_inserted: assignmentsData.length, role_id: roleId }
            transaction.commit()
            return resultInsert
        } catch (error: any) {
            transaction.rollback()
            throw this.errorHandler(error)
        }
    }

    async getAssignedSystemActionsByUser(user_id: number): Promise<ISystemActionByRole[]> {
        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)

            const assignedActions = (
                await pool
                    .select(
                        'A.system_action_name',
                        'A.component_id',
                        'A.module_name',
                        'A.route_path',
                        'A.http_method',
                        'A.action_type',
                        'A.priority',
                        'A.description',
                        'A.is_active',
                    )
                    .distinct('A.system_action_id')
                    .from(`${this.schemaName}.System_actions AS A`)
                    .innerJoin(`${this.schemaName}.${this.tableName} AS B`, 'A.system_action_id', 'B.system_action_id')
                    .innerJoin(`${this.schemaName}.User_roles AS C`, function () {
                        this.on('B.role_id', '=', 'C.role_id').andOn('C.user_id', '=', pool.raw('?', [user_id]))
                    })
                    .andWhere('A.is_active', 1)
                    .orderBy('A.system_action_name', 'asc')
            ).map((action: ISystemAction) => ({
                ...action,
                assigned: true,
            }))

            return [...assignedActions]
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }
}
