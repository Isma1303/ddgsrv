export interface IUser {
  user_id: number;
  role_id?: number;
  role_cd?: string;
  user_nm: string;
  user_lt: string;
  email: string;
  password: string;
  is_active: boolean;
  department_id?: number;
  is_leader?: boolean;
  department_nm?: string;
  end_time?: string | Date;
  start_time?: string | Date;
  notes?: string;
}

export interface IUserNew extends Omit<IUser, "user_id"> {}
export interface IUserUpdate extends Partial<IUser> {}

export interface IUserLogin {
  email: string;
  password: string;
}
