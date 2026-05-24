export interface IRole {
    role_id: number
    role: string
    status: boolean
}

export interface IRoleNew extends Omit<IRole, 'role_id'> {}
export interface IRoleUpdate extends Partial<IRoleNew> {}
