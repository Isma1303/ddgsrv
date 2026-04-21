import Model from '../../system/model'
import { Knex } from 'knex'
import { IActionByRole, IRoleByAction } from './role_action.interface'
import { IAction } from '../action/action.interface'
import { IRole } from '../role/role.interface'

export default class RoleActionModel<T, TNew, TUpdate> extends Model<T, TNew, TUpdate> {
    constructor() {
        super()
        this.connectionName = 'DB_codeliq'
        this.schemaName = 'admin'
        this.tableName = 'Role_actions'
        this.assignmentIds = ['role_id', 'action_id']
        this.tableFields = [
            {
                name: 'role_id',
                description: 'Foreign key to Role',
                required: true,
            },
            {
                name: 'action_id',
                description: 'Foreign key to Action',
                required: true,
            },
        ]
        this.fieldNames = this.getFieldsString()
    }

    async getActions(role_id: number): Promise<IActionByRole[]> {
        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)

            const assignedActions = (
                await pool
                    .select('action_id', 'action', 'table_name', 'write_permission')
                    .from(`${this.schemaName}.vw_role_actions`)
                    .where('role_id', role_id)
            ).map((action: IAction) => ({
                ...action,
                assigned: true,
            }))

            const unassignedActions = (
                await pool
                    .select('a.action_id', 'a.action', 'c.table_name', 'a.write_permission')
                    .from(`${this.schemaName}.Actions as a`)
                    .leftJoin(`${this.schemaName}.Tables as c`, 'a.table_id', 'c.table_id')
                    .leftJoin(`${this.schemaName}.${this.tableName} as b`, function () {
                        this.on('a.action_id', '=', 'b.action_id').andOn('b.role_id', '=', pool.raw('?', [role_id]))
                    })
                    .whereNull('b.role_id')
            ).map((action: IAction) => ({
                ...action,
                assigned: false,
            }))

            return [...assignedActions, ...unassignedActions]
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    async getRoles(action_id: number): Promise<IRoleByAction[]> {
        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)

            const assignedRoles = (await pool.select('role_id', 'role').from(`${this.schemaName}.vw_role_actions`).where('action_id', action_id)).map(
                (role: IRole) => ({
                    ...role,
                    assigned: true,
                }),
            )

            const unassignedRoles = (
                await pool
                    .select('a.role_id', 'a.role')
                    .from(`${this.schemaName}.Roles as a`)
                    .leftJoin(`${this.schemaName}.${this.tableName} as b`, function () {
                        this.on('a.role_id', '=', 'b.role_id').andOn('b.action_id', '=', pool.raw('?', [action_id]))
                    })
                    .whereNull('b.action_id')
            ).map((role: IRole) => ({
                ...role,
                assigned: false,
            }))

            return [...assignedRoles, ...unassignedRoles]
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }
}
