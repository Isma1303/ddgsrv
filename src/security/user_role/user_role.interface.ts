import { IRole } from '../role/role.interface'
import { IUser } from '../user/user.interface'

export interface UserByRole extends IUser {
    assigned: boolean
}

export interface RoleByUser extends IRole {
    assigned: boolean
}

export interface IUserRole {
    user_id: number
    role_id: number
}

export interface IUserRoleNew extends Omit<IUserRole, 'user_id' | 'role_id'> {}
export interface IUserRoleUpdate extends Partial<IUserRoleNew> {}
