import { Request } from 'express'
import Controller from '../../system/controller'
import Condition from '../../system/interfaces/condition.interface'
import Response from '../../system/interfaces/response.interface'
import RoleModel from '../role/role.model'
import UserModel from '../user/user.model'
import UserRoleModel from './user_role.model'
import { InvalidParameterTypeError, MissingParameterError } from '../../system/errors/controller.error'
import { IUserRole, IUserRoleNew, IUserRoleUpdate } from './user_role.interface'

export default class UserRoleController extends Controller<IUserRole, IUserRoleNew, IUserRoleUpdate> {
    model: UserRoleModel

    constructor() {
        super()
        this.model = new UserRoleModel()
        this.detailModels.push({
            modelName: 'user',
            tableField: 'user_id',
            model: new UserModel(),
        })
        this.detailModels.push({
            modelName: 'role',
            tableField: 'role_id',
            model: new RoleModel(),
        })
    }

    async getUsers(req: Request): Promise<Response> {
        try {
            if (!req.params.role_id) throw new MissingParameterError('role_id')

            const role_id = parseInt(req.params.role_id)

            if (isNaN(role_id)) throw new InvalidParameterTypeError('role_id', 'number')

            const usersByRole = await this.model.getUsers(role_id)
            return this.responseHandler({ data: usersByRole, statusCode: 200, message: 'Data retrieved successfully' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    async getRoles(req: Request): Promise<Response> {
        try {
            if (!req.params.user_id) throw new MissingParameterError('user_id')

            const user_id = parseInt(req.params.user_id)

            if (isNaN(user_id)) throw new InvalidParameterTypeError('user_id', 'number')

            const rolesByUser = await this.model.getRoles(user_id)
            return this.responseHandler({ data: rolesByUser, statusCode: 200, message: 'Data retrieved successfully' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    async getAssignedRoles(req: Request): Promise<Response> {
        try {
            if (!req.params.user_id) throw new MissingParameterError('user_id')

            const user_id = parseInt(req.params.user_id)

            if (isNaN(user_id)) throw new InvalidParameterTypeError('user_id', 'number')

            const rolesByUser = await this.model.getAssignedRoles(user_id)
            return this.responseHandler({ data: rolesByUser, statusCode: 200, message: 'Data retrieved successfully' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    public async deleteUsers(req: Request): Promise<Response> {
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

            const deletedUsers = await this.model.deleteByCondition(conditions)
            return this.responseHandler({ data: deletedUsers, statusCode: 200, message: 'Data deleted successfully' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    public async deleteRoles(req: Request): Promise<Response> {
        try {
            if (!req.params.user_id) throw new MissingParameterError('user_id')

            const user_id = parseInt(req.params.user_id)

            if (isNaN(user_id)) throw new InvalidParameterTypeError('user_id', 'number')

            const conditions: Condition[] = [
                {
                    field: 'user_id',
                    value: user_id,
                },
            ]

            const deletedRoles = await this.model.deleteByCondition(conditions)
            return this.responseHandler({ data: deletedRoles, statusCode: 200, message: 'Data deleted successfully' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }
}
