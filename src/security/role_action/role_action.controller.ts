import { Request } from 'express'
import Controller from '../../system/controller'
import Condition from '../../system/interfaces/condition.interface'
import Response from '../../system/interfaces/response.interface'
import ActionModel from '../action/action.model'
import RoleModel from '../role/role.model'
import RoleActionModel from './role_action.model'
import { HttpStatusCodes } from '../../system/interfaces/http_status_codes'
import { InvalidParameterTypeError, MissingParameterError } from '../../system/errors/controller.error'
import { IRoleAction, IRoleActionNew, IRoleActionUpdate } from './role_action.interface'

export default class RoleActionController extends Controller<IRoleAction, IRoleActionNew, IRoleActionUpdate> {
    model: RoleActionModel<IRoleAction, IRoleActionNew, IRoleActionUpdate>

    constructor() {
        super()
        this.model = new RoleActionModel()
        this.detailModels.push({
            modelName: 'role',
            tableField: 'role_id',
            model: new RoleModel(),
        })
        this.detailModels.push({
            modelName: 'action',
            tableField: 'action_id',
            model: new ActionModel(),
        })
    }

    async getActions(req: Request): Promise<Response> {
        try {
            if (!req.params.role_id) throw new MissingParameterError('role_id')

            const role_id = parseInt(req.params.role_id)

            if (isNaN(role_id)) throw new InvalidParameterTypeError('role_id', 'number')

            const actionsByRole = await this.model.getActions(role_id)
            return this.responseHandler({ data: actionsByRole, statusCode: HttpStatusCodes.OK, message: 'Data retived successfully' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    async getRoles(req: Request): Promise<Response> {
        try {
            if (!req.params.action_id) throw new MissingParameterError('action_id')

            const action_id = parseInt(req.params.action_id)

            if (isNaN(action_id)) throw new InvalidParameterTypeError('action_id', 'number')

            const rolesByAction = await this.model.getRoles(action_id)

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
}
