import {
  IUserCard,
  IUserCardCreateRequest,
  IUserCardNew,
  IUserCardUpdate,
} from "./user_card.interface";
import { UserCardModel } from "./user_card.model";
import { v4 as uuidv4 } from "uuid";
import { Request } from "express";
import { AttendanceModel } from "../attendance/users_attendance/users_attendance.model";
import { IResponse } from "../../system/shared/interfaces/http-response.interface";
import { getUserId } from "../../system/utils/auth.utils";
import Controller from "../../system/controller";

const QRCode = require("qrcode") as {
  toDataURL: (value: string) => Promise<string>;
};

const QR_PREFIX = "DDG-CARD:";
const DEFAULT_ATTENDANCE_STATUS_ID = 1;

export class UserCardController extends Controller<
  IUserCard,
  IUserCardNew,
  IUserCardUpdate
> {
  model: UserCardModel;

  constructor() {
    super();
    this.model = new UserCardModel();
  }

  async createCard(req: Request): Promise<IResponse> {
    try {
      const payload = req.body as IUserCardCreateRequest;
      const userId = Number(payload?.user_id);

      if (!Number.isInteger(userId) || userId <= 0) {
        return { status: 400, message: "Invalid user_id" };
      }

      const user = await this.model.getUserById(userId);
      if (!user) {
        return { status: 404, message: "User not found" };
      }

      if (!user.is_active) {
        return { status: 409, message: "User is not active" };
      }

      const existingCard = await this.model.getCardByUserId(userId);
      if (existingCard) {
        const qrImageDataUrl = await QRCode.toDataURL(existingCard.qr_value);
        return {
          status: 409,
          message: "User already has a card",
          data: {
            ...existingCard,
            qr_image_data_url: qrImageDataUrl,
          },
        };
      }

      const cardUuid = uuidv4();
      const qrValue = `${QR_PREFIX}${cardUuid}`;

      const createdCard = await this.model.createCard({
        user_id: userId,
        card_uuid: cardUuid,
        qr_value: qrValue,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      });

      const qrImageDataUrl = await QRCode.toDataURL(qrValue);

      return {
        status: 201,
        message: "Card created successfully",
        data: {
          ...createdCard,
          qr_image_data_url: qrImageDataUrl,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        message: "Internal Server Error",
        errorMessage: String(error?.message || error),
      };
    }
  }

  async getCardByUserId(req: Request): Promise<IResponse> {
    try {
      const userId = Number(req.params.user_id);

      if (!Number.isInteger(userId) || userId <= 0) {
        return { status: 400, message: "Invalid user_id" };
      }

      const user = await this.model.getUserById(userId);
      if (!user) {
        return { status: 404, message: "User not found" };
      }

      const card = await this.model.getCardByUserId(userId);
      if (!card) {
        return { status: 404, message: "Card not found for user" };
      }

      const qrImageDataUrl = await QRCode.toDataURL(card.qr_value);

      return {
        status: 200,
        message: "OK",
        data: {
          ...card,
          user,
          qr_image_data_url: qrImageDataUrl,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        message: "Internal Server Error",
        errorMessage: String(error?.message || error),
      };
    }
  }

  async scanQr(req: Request): Promise<IResponse> {
    try {
      const { qr_value } = req.body;

      if (!qr_value) {
        return { status: 400, message: "qr_value is required" };
      }

      if (!qr_value.startsWith(QR_PREFIX)) {
        return { status: 400, message: "Invalid QR format" };
      }

      const card = await this.model.getCardByQrValue(qr_value);
      if (!card) {
        return { status: 404, message: "QR does not exist" };
      }

      if (!card.is_active) {
        return { status: 409, message: "Card is inactive" };
      }

      if (!card.is_active) {
        return { status: 409, message: "User linked to card is inactive" };
      }

      return {
        status: 200,
        message: "QR resolved successfully",
        data: {
          card_id: card.card_id,
          user_id: card.user_id,
          user_nm: card.user_id,
          qr_value: card.qr_value,
          card_is_active: card.is_active,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        message: "Internal Server Error",
        errorMessage: String(error?.message || error),
      };
    }
  }

  async registerAttendance(req: Request): Promise<IResponse> {
    try {
      const attendanceModel = new AttendanceModel();
      const { attendance_status_id, service_event_id, notes } = req.body;
      const userId = await getUserId(req);

      const card = await this.model.getCardByUserId(userId);
      if (!card) {
        return { status: 404, message: "Carnet no encontrado." };
      }

      if (!card.is_active) {
        return { status: 409, message: "Carnet inactivo." };
      }

      const event = await this.model.getServiceEventById(service_event_id);
      if (!event) {
        return { status: 404, message: "Evento no encontrado." };
      }

      if (!event.is_active) {
        return { status: 409, message: "El evento esta inactivo." };
      }

      const attendance = await attendanceModel.add(
        {
          service_event_id: service_event_id,
          user_id: userId,
          attendance_status_id: attendance_status_id,
          notes: notes || "",
        },
        userId,
      );

      return {
        status: 201,
        message: "Asistencia registrada exitosamente",
      };
    } catch (error: any) {
      return {
        status: 500,
        message: "Internal Server Error",
        errorMessage: String(error?.message || error),
      };
    }
  }
}
