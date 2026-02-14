export interface IRole {
    role_id: number
    role_nm: string
}

export interface IRoleNew extends Omit<IRole, 'role_id'> { }
export interface IRoleUpdate extends Partial<IRole> { }