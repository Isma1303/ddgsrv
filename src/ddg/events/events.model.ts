import { Model } from "../../system/model";
import { IEvent, IEventNew, IEventUpdate } from "./events.interface";

export class EventsModel extends Model<IEvent, IEventNew, IEventUpdate> {
  constructor() {
    super();
    this.tableSchema = "ddg";
    this.tableName = "service_events";
    this.tableKey = "service_event_id";
    this.tableAlias = "e";
    this.tableColumns = [
      {
        field: "service_event_id",
        required: false,
        description: "Service Event Identifier",
        type: "number",
      },
      {
        field: "service_nm",
        required: true,
        description: "Service Name",
        type: "string",
      },
      {
        field: "service_date",
        required: true,
        description: "Service Date",
        type: "datetime",
      },
      {
        field: "start_time",
        required: true,
        description: "Start Time",
        type: "string",
      },
      {
        field: "end_time",
        required: true,
        description: "End Time",
        type: "datetime",
      },
      {
        field: "is_active",
        required: true,
        description: "Service Event Active Status",
        type: "boolean",
      },
      {
        field: "notes",
        required: false,
        description: "Additional Notes",
        type: "string",
      },
      {
        field: "department_id",
        required: true,
        description: "Department Identifier",
        type: "number",
        join: {
          table: "departments",
          tableSchema: "ddg",
          tableAlias: "d",
          field: ["department_id", "department_nm"],
          type: "left",
        },
      },
    ];
  }

  async create(data: IEventNew) {
    const pool = await this.pool();
    const transaction = await pool.transaction();
    try {
      const result = await transaction
        .insert(data)
        .into(`${this.tableSchema}.${this.tableName}`);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getUsersbyEvent(event_id: number) {
    try {
      const pool = await this.pool();
      const result = await pool.raw(
        `                
         SELECT 
         s.service_event_id,
         e.service_nm,
         e.service_date,
         e.start_time,
         e.end_time, 
         s.user_id,
         u.user_nm,
         u.user_lt,
         u.email,
         e.notes
         FROM ddg.service_events_users s 
         LEFT JOIN admin.users u on s.user_id = u.user_id
         LEFT JOIN ddg.service_events  e on s.service_event_id =  e.service_event_id
         WHERE e.is_active = TRUE AND s.service_event_id = ${event_id}
        `,
      );
      return result;
    } catch (error: any) {
      throw error.message;
    }
  }

  async assignUserEvent(event_id: number, user_id: number | number[]) {
    const pool = await this.pool();
    const transaction = await pool.transaction();
    try {
      if (Array.isArray(user_id)) {
        const insertData = user_id.map((id) => ({
          service_event_id: event_id,
          user_id: id,
        }));
        await transaction
          .insert(insertData)
          .into(`${this.tableSchema}.service_events_users`);
      } else {
        await transaction
          .insert({
            service_event_id: event_id,
            user_id: user_id,
          })
          .into(`${this.tableSchema}.service_events_users`);
      }
      await transaction.commit();
      return {
        message: "User(s) assigned to event successfully",
      };
    } catch (error: any) {
      throw error.message;
    }
  }

  async getEventsByDepartment(department_id: number) {
    try {
      const pool = await this.pool();
      const result = await pool.raw(
        `                
         SELECT 
         service_event_id,
         service_nm,
         service_date,
         start_time,
         end_time, 
         department_id
         FROM ddg.service_events
         WHERE department_id = ${department_id} AND is_active = TRUE
        `,
      );
      return result;
    } catch (error: any) {
      throw error.message;
    }
  }

  async getEventsByUserId(user_id: number) {
    try {
      const pool = await this.pool();
      const result = await pool.raw(
        `                
         SELECT 
         s.service_event_id,
         e.service_nm,
         e.service_date,
         e.start_time,
         e.end_time, 
         s.user_id
         FROM ddg.service_events_users s 
         LEFT JOIN ddg.service_events  e on s.service_event_id =  e.service_event_id
         WHERE s.user_id = ${user_id} AND e.is_active = TRUE
        `,
      );
      return result;
    } catch (error: any) {
      throw error.message;
    }
  }

  async deleteUserFromEvent(event_id: number, user_id: number) {
    const pool = await this.pool();
    const transaction = await pool.transaction();
    try {
      await transaction
        .delete()
        .from(`${this.tableSchema}.service_events_users`)
        .where({
          service_event_id: event_id,
          user_id: user_id,
        });
      await transaction.commit();
      return {
        message: "User deleted from event successfully",
      };
    } catch (error: any) {
      await transaction.rollback();
      throw error.message;
    }
  }

  async deleteEvent(event_id: number) {
    const pool = await this.pool();
    const transaction = await pool.transaction();
    try {
      await transaction.raw(
        `DELETE FROM ddg.service_events_users WHERE service_event_id = ${event_id}`,
      );
      await transaction
        .delete()
        .from(`${this.tableSchema}.${this.tableName}`)
        .where(this.tableKey, event_id);
      await transaction.commit();
      return {
        message: "Event deleted successfully",
      };
    } catch (error: any) {
      await transaction.rollback();
      throw error.message;
    }
  }

  async attendance(user_id: number, event_id: number) {
    const pool = await this.pool();
    const transaction = await pool.transaction();
    try {
      const result = await transaction
        .insert({
          user_id,
          service_event_id: event_id,
          attemdance_status_id: 6,
        })
        .into(`${this.tableSchema}.attendance`);
      await transaction.commit();
      return result;
    } catch (error: any) {
      await transaction.rollback();
      throw error.message;
    }
  }

  async getDepartmentByEvent(event_id: number) {
    try {
      const pool = await this.pool();
      const result = await pool.raw(
        `
         SELECT 
         d.department_id,
         d.department_nm
         FROM ddg.service_events e
         LEFT JOIN ddg.departments d on e.department_id = d.department_id
         WHERE e.service_event_id = ${event_id}
        `,
      );
      return result.rows[0];
    } catch (error: any) {
      throw error.message;
    }
  }

  async getDepartmentByUser(user_id: number) {
    try {
      const pool = await this.pool();
      const result = await pool.raw(
        `
         SELECT
         dm.department_id,
         dm.is_leader,
         dm.reports_to
         FROM ddg.department_members dm
         WHERE dm.user_id = ${user_id}
        `,
      );
      return result.rows[0];
    } catch (error: any) {
      throw error.message;
    }
  }
}
