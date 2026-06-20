import { IUser } from "../../admin/auth/user.interface";
import { RoleModel } from "../../admin/role/role.model";
import { configuration } from "../../system/configuration";
import { Controller } from "../../system/controller";
import { sendEmail } from "../../system/email/email.config";
import { ReminderTemplate } from "../../system/email/template/reminder.template";
import { getUserToken } from "../../system/shared/utils/req.utils";
import { IEvent, IEventNew, IEventUpdate } from "./events.interface";
import { EventsModel } from "./events.model";
import { Request } from "express";

const EMAIL_SEND_DELAY_MS = Number(process.env.EMAIL_SEND_DELAY_MS || 7000);

export class EventsController extends Controller<
  IEvent,
  IEventNew,
  IEventUpdate
> {
  constructor() {
    super(new EventsModel());
  }

  async createNewEvent(req: Request) {
    try {
      const event: any = req.body.event;
      const result = await this.model.create(event);
      return {
        status: 200,
        message: "Event created successfully",
        data: result,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: "Event creation failed",
        error: error.message,
      };
    }
  }

  async sendReminderEmail(req: Request) {
    try {
      const model = this.model as EventsModel;

      const { eventId } = req.params;

      if (!eventId) {
        return {
          status: 400,
          message: "Event ID is required",
        };
      }

      const users = await model.getUsersbyEvent(Number(eventId));

      if (users.rows.length === 0) {
        return {
          status: 404,
          message: "No users found for this event",
        };
      }

      const usersData = users.rows as Array<
        IUser & { service_nm: string; service_date: string | Date }
      >;

      const usersWithEmail = usersData.filter((user) => Boolean(user.email));

      if (usersWithEmail.length === 0) {
        return {
          status: 400,
          message: "No valid emails found for this event",
        };
      }

      const uniqueUsersByEmail = Array.from(
        new Map(usersWithEmail.map((user) => [user.email, user])).values(),
      );

      const getDepartmentName: any = await model.getDepartmentByEvent(
        Number(eventId),
      );

      let successfulEmails = 0;
      let rateLimited = false;

      for (const user of uniqueUsersByEmail) {
        const reminderHtml = ReminderTemplate(
          configuration.logo_url,
          user.user_nm,
          user.service_nm,
          user.service_date,
          getDepartmentName.department_nm!,
          user.start_time!,
          user.end_time!,
          user.notes,
        );

        const sendResult = await sendEmail(
          user.email,
          "Recordatorio de Evento",
          `Hola ${user.user_nm}, este es un recordatorio de tu evento: ${user.service_nm} (${user.service_date}).`,
          reminderHtml,
        );

        if (sendResult.sent) {
          successfulEmails += 1;
        }

        if (sendResult.rateLimited) {
          rateLimited = true;
          break;
        }

        await new Promise((resolve) =>
          setTimeout(resolve, EMAIL_SEND_DELAY_MS),
        );
      }

      if (rateLimited) {
        return {
          status: 429,
          message: "Email provider rate limit reached. Retry in a few minutes.",
          data: {
            totalUsers: uniqueUsersByEmail.length,
            sentEmails: successfulEmails,
            failedEmails: uniqueUsersByEmail.length - successfulEmails,
          },
        };
      }

      if (successfulEmails === 0) {
        return {
          status: 400,
          message: "Failed to send reminder email",
        };
      }

      return {
        status: successfulEmails === uniqueUsersByEmail.length ? 200 : 207,
        message:
          successfulEmails === uniqueUsersByEmail.length
            ? "Reminder email sent successfully"
            : "Reminder email sent with partial failures",
        data: {
          totalUsers: uniqueUsersByEmail.length,
          sentEmails: successfulEmails,
          failedEmails: uniqueUsersByEmail.length - successfulEmails,
        },
      };
    } catch (error) {
      return {
        status: 500,
        message: "Failed to send reminder email",
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async assignUserToEvent(req: Request) {
    try {
      const model = this.model as EventsModel;
      const eventId = req.params.eventId;
      const { user_id } = req.body;

      if (!eventId || !user_id) {
        return {
          status: 400,
          message: "Event ID and User ID are required",
        };
      }

      const result = await model.assignUserEvent(Number(eventId), user_id);

      return {
        status: 200,
        message: "User assigned to event successfully",
        data: result,
      };
    } catch (error: any) {
      return {
        status: 500,
        message: "Failed to assign user to event",
        error: error.message,
      };
    }
  }

  async getUsersByEvent(req: Request) {
    try {
      const model = this.model as EventsModel;
      const eventId = req.params.eventId;

      if (!eventId) {
        return {
          status: 400,
          message: "Event ID is required",
        };
      }

      const result = await model.getUsersbyEvent(Number(eventId));

      return {
        status: 200,
        message: "Users retrieved successfully",
        data: result.rows,
      };
    } catch (error: any) {
      return {
        status: 500,
        message: "Failed to retrieve users for event",
        error: error.message,
      };
    }
  }

  async getEventsByUserId(req: Request) {
    try {
      const model = this.model as EventsModel;
      const userId = req.params.userId;
      const userRole = await getUserToken(req);

      if (!userId) {
        return {
          status: 400,
          message: "User ID is required",
        };
      }

      const roleCd = userRole.role_cd;

      if (roleCd == "USER") {
        const result = await model.getEventsByUserId(Number(userId));

        return {
          status: 200,
          message: "Events retrieved successfully",
          data: result.rows,
        };
      }

      if (roleCd == "LEADER") {
        if (!userRole.department_id) {
          return {
            status: 400,
            message: "Leader has no assigned department",
          };
        }

        const result = await model.getEventsByDepartment(
          userRole.department_id,
        );

        return {
          status: 200,
          message: "Events retrieved successfully",
          data: result.rows,
        };
      }

      if (roleCd == "ADMIN") {
        const result = await model.getAll();

        return {
          status: 200,
          message: "Events retrieved successfully",
          data: result,
        };
      }

      return {
        status: 403,
        message: "Role not authorized to retrieve events",
      };
    } catch (error: any) {
      return {
        status: 500,
        message: "Failed to retrieve events for user",
        error: error.message,
      };
    }
  }

  async deleteUserFromEvent(req: Request) {
    try {
      const model = this.model as EventsModel;
      const eventId = req.params.eventId;
      const userId = req.params.userId;

      if (!eventId || !userId) {
        return {
          status: 400,
          message: "Event ID and User ID are required",
        };
      }

      const result = await model.deleteUserFromEvent(
        Number(eventId),
        Number(userId),
      );

      return {
        status: 200,
        message: "User deleted from event successfully",
        data: result,
      };
    } catch (error: any) {
      return {
        status: 500,
        message: "Failed to delete user from event",
        error: error.message,
      };
    }
  }

  async deleteEvent(req: Request) {
    try {
      const model = this.model as EventsModel;
      const eventId = req.params.id;

      if (!eventId) {
        return {
          status: 400,
          message: "Event ID is required",
        };
      }

      const result = await model.deleteEvent(Number(eventId));

      return {
        status: 200,
        message: "Event deleted successfully",
        data: result,
      };
    } catch (error: any) {
      return {
        status: 500,
        message: "Failed to delete event",
        error: error.message,
      };
    }
  }

  async attendance(req: Request) {
    try {
      const model = this.model as EventsModel;
      const { user_id, event_id } = req.body;
      const result = await model.attendance(user_id, event_id);
      return {
        status: 200,
        message: "Attendance recorded successfully",
        data: result,
      };
    } catch (error: any) {
      return {
        status: 500,
        message: "Failed to record attendance",
        error: error.message,
      };
    }
  }
}
