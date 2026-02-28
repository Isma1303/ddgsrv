import { Model } from "../../system/model";
import { IUser, IUserLogin, IUserNew, IUserUpdate } from "./user.interface";

export class UserModel extends Model<IUser, IUserNew, IUserUpdate> {
  constructor() {
    super();
    this.tableSchema = "admin";
    this.tableName = "users";
    this.tableKey = "user_id";
    this.tableAlias = "u";
    this.tableColumns = [
      {
        field: "user_nm",
        type: "string",
        required: true,
        description: "User Name",
      },
      {
        field: "user_lt",
        type: "string",
        required: true,
        description: "User Last Name",
      },
      {
        field: "email",
        type: "string",
        required: true,
        description: "User Email",
      },
      {
        field: "password",
        type: "string",
        required: true,
        description: "User Password",
      },
      {
        field: "is_manager",
        type: "boolean",
        required: true,
        description: "Is Manager",
      },
      {
        field: "is_active",
        type: "boolean",
        required: true,
        description: "User Active",
      },
    ];
  }

  async login(email: string): Promise<IUser> {
    try {
      const user = await (await this.pool())
        .select("*")
        .from(`${this.tableSchema}.${this.tableName}`)
        .where("email", email)
        .first();
      return user;
    } catch (error: any) {
      throw error.message;
    }
  }

  async register(user: IUserNew): Promise<IUserNew> {
    try {
      const [response] = await (await this.pool())
        .insert(user)
        .into(`${this.tableSchema}.${this.tableName}`)
        .returning("*");
      return response;
    } catch (error: any) {
      throw error.message;
    }
  }

  async updatePassword(id: number, password: string): Promise<IUserUpdate> {
    try {
      const [response] = await (await this.pool())
        .update({ password })
        .into(`${this.tableSchema}.${this.tableName}`)
        .where(this.tableKey, id)
        .returning("*");
      return response;
    } catch (error: any) {
      throw error.message;
    }
  }

async profile(userId: number): Promise<IUser> {
  try {
    const schema = this.tableSchema;
    const usersTable = this.tableName;  
    const userKey = this.tableKey;      

    const user = await (await this.pool())
      .select("u.*", "r.*") 
      .from({ u: `${schema}.${usersTable}` })
      .join({ ur: `${schema}.user_roles` }, `u.${userKey}`, "=", "ur.user_id")
      .join({ r: `${schema}.role` }, "ur.role_id", "=", "r.role_id")
      .where(`u.${userKey}`, userId)
      .first();

    return user;
  } catch (error: any) {
    throw error.message;
  }
}

  async deleteUser(id: number) {
    const pool = await this.pool();
    const transaction = await pool.transaction();
    try {
      const deleteRoles = transaction
        .delete()
        .from(`${this.tableSchema}.user_roles`)
        .where("user_id", id);
      const deleteUser = transaction
        .delete()
        .from(`${this.tableSchema}.${this.tableName}`)
        .where(this.tableKey, id);
      await Promise.all([deleteRoles, deleteUser]);
      await transaction.commit();
      return true;
    } catch (error: any) {
      await transaction.rollback();
      throw error.message;
    }
  }
}
