import { Model } from "../../system/model";
import { IUser, IUserLogin, IUserNew, IUserUpdate } from "./user.interface";

export class UserModel extends Model<IUser, IUserNew, IUserUpdate> {
    constructor() {
        super()
        this.tableSchema = "admin"
        this.tableName = "users"
        this.tableKey = "user_id"
        this.tableColumns = [
            {
                field: "user_nm",
                type: "string",
                required: true,
                description: "User Name"
            },
            {
                field: "user_lt",
                type: "string",
                required: true,
                description: "User Last Name"
            },
            {
                field: "email",
                type: "string",
                required: true,
                description: "User Email"
            },
            {
                field: "password",
                type: "string",
                required: true,
                description: "User Password"
            },
            {
                field: "is_active",
                type: "boolean",
                required: true,
                description: "User Active"
            },
            {
                field: "role",
                type: "string",
                required: true,
                description: "User Role"
            }
        ]
    }

    async login(email: string): Promise<IUser> {
        try {
            const user = await (await this.pool())
                .select("*")
                .from(`${this.tableSchema}.${this.tableName}`)
                .where("email", email)
                .first()
            return user
        } catch (error) {
            throw error
        }
    }

    async register(user: IUserNew): Promise<IUserNew> {
        try {
            const [response] = await (await this.pool())
                .insert(user)
                .into(`${this.tableSchema}.${this.tableName}`)
                .returning("*")
            return response
        } catch (error) {
            throw error
        }
    }

    async updatePassword(id: number, password: string): Promise<IUserUpdate> {
        try {
            const [response] = await (await this.pool())
                .update({ password })
                .into(`${this.tableSchema}.${this.tableName}`)
                .where(this.tableKey, id)
                .returning("*")
            return response
        } catch (error) {
            throw error
        }
    }
}