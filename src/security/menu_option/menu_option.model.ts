import Model from '../../system/model'
import { nestRecords } from '../../system/utils/transform.utils'
import { Knex } from 'knex'
import { MenuOption } from './menu_option.interface'

export default class MenuOptionModel<T, TNew, TUpdate> extends Model<T, TNew, TUpdate> {
    constructor() {
        super()
        this.connectionName = 'DB_ADMIN'
        this.schemaName = 'admin'
        this.tableName = 'Menu_options'
        this.tableId = 'menu_option_id'
        this.tableFields = [
            {
                name: 'menu_option_id',
                description: 'Unique identifier for the menu_options table',
                required: false,
            },
            {
                name: 'menu_option',
                description: 'Menu option name',
                required: true,
                maxLength: 200,
            },
            {
                name: 'icon',
                description: 'Menu option icon',
                required: false,
                maxLength: 200,
            },
            {
                name: 'path',
                description: 'Menu option path',
                required: false,
                maxLength: 200,
            },
            {
                name: 'sort',
                description: 'Alphabetical order of the menu',
                required: true,
                maxLength: 3,
            },
            {
                name: 'parent_menu_option_id',
                description: 'Parent menu option',
                required: true,
            },
        ]
        this.fieldNames = this.getFieldsString()
    }

    async getMenuOptions(userId: number): Promise<MenuOption[]> {
        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)
            const query = pool!
                .select(['menu_option_id as id', 'menu_option as text', 'icon as icon', 'path', 'parent_menu_option_id as parentId', 'sort'])
                .from(`${this.schemaName}.vw_user_menu_options`)
                .where('user_id', userId)
                .orderBy('sort')
                .distinct('menu_option_id')
            const result = await query
            return result
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    async getNestedMenuOptions(userId: number): Promise<Record<string, any>> {
        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)
            const query = pool!
                .select([
                    'menu_option_id as id',
                    'menu_option as text',
                    'icon as icon',
                    'path',
                    'parent_menu_option_id as parentId',
                    'parent_menu_option_id',
                    'sort',
                ])
                .from(`${this.schemaName}.vw_user_menu_options`)
                .where('user_id', userId)
                .orderBy('sort')
                .distinct('menu_option_id')
            const menuOptions =await query
            
            const result = nestRecords(menuOptions, 'menu_option_id', 'parent_menu_option_id', 'items')
            
            result.unshift({
                icon: 'bi bi-house',
                id: -1,
                items: [],
                menu_option_id: -1,
                sort: '100',
                parent_menu_option_id: -1,
                path: '/',
                text: 'Home',
            })
            return result
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }
}
