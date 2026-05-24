import { IUser } from "../../security/user/user.interface";
import { configuration } from "../../system/configuration";
import Controller from "../../system/controller";
import { sendEmail } from "../../system/email/email.config";
import { ReminderTemplate } from "../../system/email/template/reminder.template";
import { getUserToken } from "../../system/shared/utils/req.utils";
import { getUserId } from "../../system/utils/auth.utils";
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
    model: EventsModel;
    super();
    this.model = new EventsModel();
  }

  async createNewEvent(req: Request) {
    try {
      const userId = await getUserId(req);
      const event: any = req.body.event;
      const result = await this.model.add(event, userId);
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
        const result = await model.getAll({});

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
