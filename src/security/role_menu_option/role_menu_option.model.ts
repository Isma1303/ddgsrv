import { Knex } from 'knex'
import Model from '../../system/model'
import { nestRecords } from '../../system/utils/transform.utils'
import { IMenuOption } from '../menu_option/menu_option.interface'
import { IMenuOptionByRole, IRoleByMenuOption } from './role_menu_option.interface'
import { IRole } from '../role/role.interface'

export default class RoleMenuOptionModel<T, TNew, TUpdate> extends Model<T, TNew, TUpdate> {
    constructor() {
        super()
        this.connectionName = 'DB_ADMIN'
        this.schemaName = 'admin'
        this.tableName = 'Roles_menu_options'
        this.assignmentIds = ['role_id', 'menu_option_id']
        this.tableFields = [
            {
                name: 'role_id',
                description: 'Foreign key to Role',
                required: true,
            },
            {
                name: 'menu_option_id',
                description: 'Foreign key to Menu Option',
                required: true,
            },
        ]
        this.fieldNames = this.getFieldsString()
    }

    async getMenuOptions(role_id: number): Promise<IMenuOptionByRole[]> {
        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)

            const assignedOptions = (
                await pool.select('menu_option_id', 'menu_option').from(`${this.schemaName}.vw_role_menu_options`).where('role_id', role_id)
            ).map((option: IMenuOption) => ({
                ...option,
                assigned: true,
            }))

            const unassignedOptions = (
                await pool
                    .select('a.menu_option_id', 'a.menu_option')
                    .from(`${this.schemaName}.menu_options as a`)
                    .leftJoin(`${this.schemaName}.${this.tableName} as b`, function () {
                        this.on('a.menu_option_id', '=', 'b.menu_option_id').andOn('b.role_id', '=', pool.raw('?', [role_id]))
                    })
                    .whereNull('b.role_id')
            ).map((option: IMenuOption) => ({
                ...option,
                assigned: false,
            }))

            return [...assignedOptions, ...unassignedOptions]
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    async getRoles(menu_option_id: number): Promise<IRoleByMenuOption[]> {
        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)

            const assignedRoles = (
                await pool.select('role_id', 'role').from(`${this.schemaName}.vw_role_menu_options`).where('menu_option_id', menu_option_id)
            ).map((role: IRole) => ({
                ...role,
                assigned: true,
            }))

            const unassignedRoles = (
                await pool
                    .select('a.role_id', 'a.role')
                    .from(`${this.schemaName}.roles as a`)
                    .leftJoin(`${this.schemaName}.${this.tableName} as b`, function () {
                        this.on('a.role_id', '=', 'b.role_id').andOn('b.menu_option_id', '=', pool.raw('?', [menu_option_id]))
                    })
                    .whereNull('b.menu_option_id')
            ).map((role: IRole) => ({
                ...role,
                assigned: false,
            }))

            return [...assignedRoles, ...unassignedRoles]
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    async getAdminMenuOptions(fields: string[] = this.fieldNames, role_id: number): Promise<Record<string, any>[]> {
        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)

            const assignedOptions: Record<string, any>[] = (
                await pool.select(fields).from(`${this.schemaName}.vw_role_menu_options`).where('role_id', role_id)
            ).map((option: Record<string, any>) => ({
                ...option,
                assigned: true,
            }))

            const unassignedOptions: Record<string, any>[] = (
                await pool
                    .select(
                        'a.menu_option_id as id',
                        'a.menu_option as text',
                        'a.icon as icon',
                        'a.path as path',
                        'a.parent_menu_option_id as parentId',
                        'a.sort',
                    )
                    .from(`${this.schemaName}.menu_options as a`)
                    .leftJoin(`${this.schemaName}.${this.tableName} as b`, function () {
                        this.on('a.menu_option_id', '=', 'b.menu_option_id').andOn('b.role_id', '=', pool.raw('?', [role_id]))
                    })
                    .whereNull('b.role_id')
            ).map((option: Record<string, any>) => ({
                ...option,
                assigned: false,
            }))

            const nestedOptions = nestRecords([...assignedOptions, ...unassignedOptions], 'id', 'parentId', 'items')
            let optionsToRender: any[] = []

            for (const parentMenu of nestedOptions) {
                if (!parentMenu.items || parentMenu.items.length === 0) {
                    optionsToRender.push(parentMenu)
                    continue
                }
                optionsToRender = [
                    ...optionsToRender,
                    ...parentMenu.items.filter((o: any) => o.assigned && !Object.prototype.hasOwnProperty.call(o, 'items')),
                ]
                for (const childMenu of parentMenu.items) {
                    if (childMenu.items || childMenu.items?.length > 0) {
                        optionsToRender = [...optionsToRender, ...childMenu.items.filter((o: any) => o.assigned)]
                    }
                }
            }

            optionsToRender = optionsToRender.map((o) => o.id)
            assignedOptions.forEach((o: any) => {
                o.assigned = optionsToRender.includes(o.id)
            })

            const result = nestRecords(
                [...assignedOptions, ...unassignedOptions].sort((a, b) => a.sort - b.sort),
                'id',
                'parentId',
                'items',
            )
            return result
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }
}
