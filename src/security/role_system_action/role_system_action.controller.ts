import { Request } from 'express'
import Controller from '../../system/controller'
import Condition from '../../system/interfaces/condition.interface'
import Response from '../../system/interfaces/response.interface'
import RoleModel from '../role/role.model'
import RoleSystemActionModel from './role_system_action.model'
import { HttpStatusCodes } from '../../system/interfaces/http_status_codes'
import { InvalidParameterTypeError, MissingParameterError } from '../../system/errors/controller.error'
import { IRoleSystemAction, IRoleSystemActionNew, IRoleSystemActionUpdate } from './role_system_action.interface'
import SystemActionModel from '../system_action/system_action.model'

export default class RoleSystemActionController extends Controller<IRoleSystemAction, IRoleSystemActionNew, IRoleSystemActionUpdate> {
    model: RoleSystemActionModel<IRoleSystemAction, IRoleSystemActionNew, IRoleSystemActionUpdate>

    constructor() {
        super()
        this.model = new RoleSystemActionModel()
        this.detailModels.push({
            modelName: 'role',
            tableField: 'role_id',
            model: new RoleModel(),
        })
        this.detailModels.push({
            modelName: 'system_action',
            tableField: 'system_action_id',
            model: new SystemActionModel(),
        })
    }

    async getSystemActions(req: Request): Promise<Response> {
        try {
            if (!req.params.role_id) throw new MissingParameterError('role_id')

            const role_id = parseInt(req.params.role_id)

            if (isNaN(role_id)) throw new InvalidParameterTypeError('role_id', 'number')

            const actionsByRole = await this.model.getSystemActions(role_id)
            return this.responseHandler({ data: actionsByRole, statusCode: HttpStatusCodes.OK, message: 'Data retived successfully' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    async getAssignedSystemActionsByUser(req: Request): Promise<Response> {
        try {
            if (!req.params.user_id) throw new MissingParameterError('user_id')

            const user_id = parseInt(req.params.user_id)

            if (isNaN(user_id)) throw new InvalidParameterTypeError('user_id', 'number')

            const actionsByRole = await this.model.getAssignedSystemActionsByUser(user_id)
            return this.responseHandler({ data: actionsByRole, statusCode: HttpStatusCodes.OK, message: 'Data retived successfully' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    async getSystemActionsByName(req: Request): Promise<Response> {
        try {
            if (!req.params.role_id) throw new MissingParameterError('role_id')

            const role_id = parseInt(req.params.role_id)

            const system_action_name = req.headers['system_action_name'] as string

            if (isNaN(role_id)) throw new InvalidParameterTypeError('role_id', 'number')

            if (!system_action_name) throw new MissingParameterError('system_action_name')

            const actionsByRole = await this.model.getSystemActionsByName(role_id, system_action_name)
            return this.responseHandler({ data: actionsByRole, statusCode: HttpStatusCodes.OK, message: 'Data retived successfully' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    async getRoles(req: Request): Promise<Response> {
        try {
            if (!req.params.system_action_id) throw new MissingParameterError('system_action_id')

            const systemActionId = parseInt(req.params.system_action_id)

            if (isNaN(systemActionId)) throw new InvalidParameterTypeError('system_action_id', 'number')

            const rolesByAction = await this.model.getRoles(systemActionId)

            return this.responseHandler({ data: rolesByAction, statusCode: HttpStatusCodes.OK, message: 'Data retived successfully' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    public async deleteActions(req: Request): Promise<Response> {
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

            const result = await this.model.deleteByCondition(conditions)

            return this.responseHandler({ data: result, statusCode: HttpStatusCodes.OK, message: 'Data deleted successfully' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    async createSystemActionsAssignments(req: Request): Promise<Response> {
        try {
            const { ids, role_id } = req.body

            if (!ids) throw new MissingParameterError('ids')
            if (!role_id) throw new MissingParameterError('role_id')

            const systemActionsIds: number[] = ids as number[]
            const roleId: number = role_id as number

            if (!Array.isArray(systemActionsIds)) throw new InvalidParameterTypeError('ids', 'array')
            if (isNaN(roleId)) throw new InvalidParameterTypeError('role_id', 'number')

            const newRecords: IRoleSystemActionNew[] = systemActionsIds.map((system_action_id: number) => {
                return {
                    role_id: roleId,
                    system_action_id,
                }
            })

            const createdRecords = await this.model.createSystemActionsAssignments(newRecords, roleId)

            return this.responseHandler({ data: createdRecords, message: 'Records updated successfully', statusCode: HttpStatusCodes.OK })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }
}
