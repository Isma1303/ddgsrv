export interface IUser {
    user_id: number
    user: string
    name: string
    email: string
    password?: string
    status: boolean
}

export interface IUserNew extends Omit<IUser, 'user_id'> {}
export interface IUserUpdate extends Partial<IUser> {}
