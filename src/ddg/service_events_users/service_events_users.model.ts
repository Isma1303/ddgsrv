import Model from "../../system/model";
import {
  IServiceEventsUsers,
  IServiceEventsUsersNew,
  IServiceEventsUsersUpdate,
} from "./service_events_users.interface";

export class ServiceEventsUsersModel extends Model<
  IServiceEventsUsers,
  IServiceEventsUsersNew,
  IServiceEventsUsersUpdate
> {
  constructor() {
    super();
    this.schemaName = "ddg";
    this.tableName = "service_events_users";
    this.tableId = "service_event_id";
    this.tableAlias = "seu";
    this.tableFields = [
      {
        name: "service_event_id",
        description: "Identificador del evento de servicio",
        required: true,
      },
      {
        name: "user_id",
        description: "Identificador del usuario",
        required: true,
        join: {
          table: "admin.Users",
          alias: "u",
          field: "user_id",
          select: ["name", "email"],
        },
      },
    ];
  }

  public async deleteUserFromService(
    service_event_id: number,
    user_id: number,
  ): Promise<IServiceEventsUsers | null> {
    try {
      const pool = await this.connection.getConnection(this.connectionName);
      return await pool!
        .delete()
        .from(`${this.schemaName}.${this.tableName}`)
        .where("service_event_id", service_event_id)
        .where("user_id", user_id)
        .returning(this.fieldNames);
    } catch (error: any) {
      throw this.errorHandler(error);
    }
  }
}
