import { Request } from 'express'
import Controller from '../../system/controller'
import Condition from '../../system/interfaces/condition.interface'
import Response from '../../system/interfaces/response.interface'
import { getUserId } from '../../system/utils/auth.utils'
import RoleModel from '../role/role.model'
import UserModel from '../user/user.model'
import TableRoleRecordModel from './table_role_record.model'
import { InvalidParameterTypeError, MissingParameterError } from '../../system/errors/controller.error'
import { HttpStatusCodes } from '../../system/interfaces/http_status_codes'
import { ITableRoleRecord, ITableRoleRecordNew, ITableRoleRecordUpdate } from './table_role_record.interface'

export default class TableRoleRecordController extends Controller<ITableRoleRecord, ITableRoleRecordNew, ITableRoleRecordUpdate> {
    model: TableRoleRecordModel<ITableRoleRecord, ITableRoleRecordNew, ITableRoleRecordUpdate>

    constructor() {
        super()
        this.model = new TableRoleRecordModel()
        this.detailModels.push({
            modelName: 'user',
            tableField: 'record_id',
            model: new UserModel(),
        })
        this.detailModels.push({
            modelName: 'role',
            tableField: 'role_id',
            model: new RoleModel(),
        })
    }

    async getAssignedTableRecords(req: Request): Promise<Response> {
        try {
            if (!req.params.role_id) throw new MissingParameterError('role_id')

            const role_id = parseInt(req.params.role_id)

            if (isNaN(role_id)) throw new InvalidParameterTypeError('role_id', 'number')

            const assignedTableRecords = await this.model.getAssignedTableRecords(role_id)

            return this.responseHandler({ data: assignedTableRecords, statusCode: HttpStatusCodes.OK, message: 'Data retrieved successfully' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    async getAssignedTableRecordsRLS(req: Request): Promise<Response> {
        try {
            if (!req.params.role_id) throw new MissingParameterError('role_id')

            const role_id = parseInt(req.params.role_id)

            if (isNaN(role_id)) throw new InvalidParameterTypeError('role_id', 'number')

            if (!req.params.table_id) throw new MissingParameterError('table_id')

            const table_id = parseInt(req.params.table_id)

            if (isNaN(table_id)) throw new InvalidParameterTypeError('table_id', 'number')

            const assignedTableRecords = await this.model.getAssignedTableRecordsRLS(role_id, table_id)

            return this.responseHandler({ data: assignedTableRecords, statusCode: HttpStatusCodes.OK, message: 'Data retrieved successfully' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    public async deleteTableRecords(req: Request): Promise<Response> {
        try {
            if (!req.params.role_id) throw new MissingParameterError('role_id')

            const role_id = parseInt(req.params.role_id)

            if (isNaN(role_id)) throw new InvalidParameterTypeError('role_id', 'number')

            const conditions: Condition[] = [
                {
                    field: 'role_id',
                    value: role_id,
                },
            ]

            const deletedTableRecords = await this.model.deleteByCondition(conditions)

            return this.responseHandler({ data: deletedTableRecords, statusCode: HttpStatusCodes.OK, message: 'Data deleted successfully' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    public async deleteRoles(req: Request): Promise<Response> {
        try {
            if (!req.params.record_id) throw new MissingParameterError('record_id')

            const record_id = parseInt(req.params.record_id)

            if (isNaN(record_id)) throw new InvalidParameterTypeError('record_id', 'number')

            const conditions: Condition[] = [
                {
                    field: 'record_id',
                    value: record_id,
                },
            ]

            const deletedTableRecords = await this.model.deleteByCondition(conditions)

            return this.responseHandler({ data: deletedTableRecords, statusCode: HttpStatusCodes.OK, message: 'Data deleted successfully' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    public async updateTableRecords(req: Request): Promise<Response> {
        try {
            let { added } = req.body
            const { role_id, table_id, field } = req.body
            const userId = await getUserId(req)

            if (!role_id || !table_id || !field) throw new MissingParameterError('role_id, table_id, field')

            await this.model.executeWithTransaction(async (transaction) => {
                const conditions: Condition[] = [
                    {
                        field: 'role_id',
                        value: role_id,
                    },
                    {
                        field: 'table_id',
                        value: table_id,
                    },
                ]

                await this.model.deleteByCondition(conditions, { transaction })


                if (added.length > 0) {
                    added = added.map((record_id: number) => {
                        return { role_id, table_id, field, record_id }
                    })
                    await this.model.batchInsert(added, userId, { transaction })
                }
            })

            return this.responseHandler({ statusCode: HttpStatusCodes.OK, message: 'Data updated successfully' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }
}
