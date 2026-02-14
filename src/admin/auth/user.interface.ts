export interface IUser {
    user_id: number
    user_nm: string
    user_lt: string
    email: string
    password: string
    is_active: boolean
    role: string
}

export interface IUserNew extends Omit<IUser, "user_id"> { }
export interface IUserUpdate extends Partial<IUser> { }

export interface IUserLogin {
    email: string
    password: string
}
