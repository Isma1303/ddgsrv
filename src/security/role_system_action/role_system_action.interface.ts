import { ISystemAction } from '../system_action/system_action.interface'
import { IRole } from '../role/role.interface'

export interface ISystemActionByRole extends ISystemAction {
    assigned: boolean
}

export interface IRoleBySystemAction extends IRole {
    assigned: boolean
}

export interface IRoleSystemAction {
    role_id: number
    system_action_id: number
}
export interface IRoleSystemActionNew extends Omit<IRoleSystemAction, 'role_systen_action_id'> {}
export interface IRoleSystemActionUpdate extends Partial<IRoleSystemActionNew> {}
