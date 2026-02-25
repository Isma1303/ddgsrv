import { IMenuOption } from '../menu_option/menu_option.interface'
import { IRole } from '../role/role.interface'

export interface IMenuOptionByRole extends IMenuOption {
    assigned: boolean
}

export interface IRoleByMenuOption extends IRole {
    assigned: boolean
}

export interface IRoleMenuOption {
    role_id: number
    menu_option_id: number
}

export interface IRoleMenuOptionNew extends Omit<IRoleMenuOption, 'role_menu_option_id'> {}
export interface IRoleMenuOptionUpdate extends Partial<IRoleMenuOptionNew> {}
