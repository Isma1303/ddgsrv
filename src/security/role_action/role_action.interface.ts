import { IAction } from '../action/action.interface'
import { IRole } from '../role/role.interface'

export interface IActionByRole extends IAction {
    assigned: boolean
}

export interface IRoleByAction extends IRole {
    assigned: boolean
}

export interface IRoleAction {
    role_id: number
    action_id: number
}
export interface IRoleActionNew extends Omit<IRoleAction, 'role_action_id'> {}
export interface IRoleActionUpdate extends Partial<IRoleActionNew> {}
