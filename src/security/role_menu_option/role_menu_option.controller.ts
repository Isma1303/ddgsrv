import { Request } from 'express'
import Controller from '../../system/controller'
import Condition from '../../system/interfaces/condition.interface'
import IResponse from '../../system/interfaces/response.interface'
import MenuOptionModel from '../menu_option/menu_option.model'
import RoleModel from '../role/role.model'
import RoleMenuOptionModel from './role_menu_option.model'
import { InvalidParameterTypeError, MissingParameterError } from '../../system/errors/controller.error'
import { IRoleMenuOption, IRoleMenuOptionNew, IRoleMenuOptionUpdate } from './role_menu_option.interface'

export default class RoleMenuOptionController extends Controller<IRoleMenuOption, IRoleMenuOptionNew, IRoleMenuOptionUpdate> {
    model: RoleMenuOptionModel<IRoleMenuOption, IRoleMenuOptionNew, IRoleMenuOptionUpdate>

    constructor() {
        super()
        this.model = new RoleMenuOptionModel()
        this.detailModels.push({
            modelName: 'role',
            tableField: 'role_id',
            model: new RoleModel(),
        })
        this.detailModels.push({
            modelName: 'menu_option',
            tableField: 'menu_option_id',
            model: new MenuOptionModel(),
        })
    }

    async getMenuOptions(req: Request): Promise<IResponse> {
        try {
            if (!req.params.role_id) throw new MissingParameterError('role_id')

            const role_id = parseInt(req.params.role_id as string)

            if (isNaN(role_id)) throw new InvalidParameterTypeError('role_id', 'number')

            const menuOptionsByRole = await this.model.getMenuOptions(role_id)

            return this.responseHandler({ data: menuOptionsByRole, statusCode: 200, message: 'Data retived successfully' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    async getAdminMenuOptions(req: Request): Promise<IResponse> {
        try {
            const fields = ['menu_option_id as id', 'menu_option as text', 'icon as icon', 'path', 'parent_menu_option_id as parentId', 'sort']

            if (!req.params.role_id) throw new MissingParameterError('role_id')

            const role_id = parseInt(req.params.role_id as string)

            if (isNaN(role_id)) throw new InvalidParameterTypeError('role_id', 'number')

            const menuOptionsByRole = await this.model.getAdminMenuOptions(fields, role_id)

            return this.responseHandler({ data: menuOptionsByRole, statusCode: 200, message: 'Data retived successfully' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    async getRoles(req: Request): Promise<IResponse> {
        try {
            if (!req.params.menu_option_id) throw new MissingParameterError('menu_option_id')

            const menu_option_id = parseInt(req.params.menu_option_id as string)

            if (isNaN(menu_option_id)) throw new InvalidParameterTypeError('menu_option_id', 'number')

            const rolesByMenuOption = await this.model.getRoles(menu_option_id)

            return this.responseHandler({ data: rolesByMenuOption, statusCode: 200, message: 'Data retived successfully' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    public async deleteMenuOptions(req: Request): Promise<IResponse> {
        try {
            if (!req.params.role_id) throw new MissingParameterError('role_id')

            const role_id = parseInt(req.params.role_id as string)

            if (isNaN(role_id)) throw new InvalidParameterTypeError('role_id', 'number')

            const conditions: Condition[] = [
                {
                    field: 'role_id',
                    value: role_id,
                },
            ]

            const deletedMenuOptions = await this.model.deleteByCondition(conditions)

            return this.responseHandler({ data: deletedMenuOptions, statusCode: 200, message: 'Data deleted successfully' })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }
}
