import Model from '../../system/model'
import TableModel from '../table/table.model'
import { Knex } from 'knex'

export default class TableRoleRecordModel<T, TNew, TUpdate> extends Model<T, TNew, TUpdate> {
    tableModel = new TableModel()

    constructor() {
        super()
        this.connectionName = 'DB_ADMIN'
        this.schemaName = 'admin'
        this.tableName = 'Table_record_roles'
        this.assignmentIds = ['record_id', 'role_id']
        this.tableFields = [
            {
                name: 'record_id',
                description: 'Foreign key to record',
                required: true,
            },
            {
                name: 'role_id',
                description: 'Foreign key to role',
                required: true,
            },
            {
                name: 'table_id',
                description: 'Foreign key to tables',
                required: true,
            },
            {
                name: 'field',
                description: 'The record ID',
                required: true,
            },
        ]
        this.fieldNames = this.getFieldsString()
    }

    async getAssignedTableRecords(role_id: number | number[]): Promise<Record<string, any>[]> {
        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)
            const assignedRecords = pool.select('table_id', 'record_id', 'field').from(`${this.schemaName}.vw_table_record_roles`)

            if (typeof role_id === 'number') {
                assignedRecords.where('role_id', role_id)
            } else {
                assignedRecords.whereIn('role_id', role_id)
            }

            return await assignedRecords
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    async getAssignedTableRecordsRLS(role_id: number, table_id: number): Promise<Record<string, any>[]> {
        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)
            const assignedRecords = pool
                .select('table_id', 'record_id', 'field')
                .from(`${this.schemaName}.vw_table_record_roles`)
                .where('role_id', role_id)
                .andWhere('table_id', table_id)

            return await assignedRecords
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    async getFilteredFields(): Promise<Record<string, any>[]> {
        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)
            const filteredFields = pool.from(`${this.schemaName}.vw_table_record_roles`).distinct('field')

            return await filteredFields
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }
}
