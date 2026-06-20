<<<<<<< Updated upstream
import { Controller } from "../../system/controller";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  IAttendanceRegisterRequest,
  IQrScanRequest,
  IUserCardCreateRequest,
  IUserCard,
  IUserCardNew,
  IUserCardUpdate,
} from "./user_card.interface";
import { UserCardModel } from "./user_card.model";
import { getUserToken } from "../../system/shared/utils/req.utils";
=======
import Controller from '../../system/controller'
import { IUserCard, IUserCardNew, IUserCardUpdate } from './user_card.interface'
import { UserCardModel } from './user_card.model'
import { v4 as uuidv4 } from 'uuid'
import { Request } from 'express'
import UserModel from '../../security/user/user.model'
import IResponse from '../../system/interfaces/response.interface'
import { getUserId } from '../../system/utils/auth.utils'
import { AttendanceModel } from '../attendance/attendance.model'
>>>>>>> Stashed changes

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
  private readonly userCardModel: UserCardModel;

  constructor() {
    const model = new UserCardModel();
    super(model);
    this.userCardModel = model;
  }

  async createCard(req: Request) {
    try {
      const payload = req.body as IUserCardCreateRequest;
      const userId = Number(payload?.user_id);

      if (!Number.isInteger(userId) || userId <= 0) {
        return { status: 400, message: "Invalid user_id" };
      }

      const user = await this.userCardModel.getUserById(userId);
      if (!user) {
        return { status: 404, message: "User not found" };
      }

      if (!user.is_active) {
        return { status: 409, message: "User is not active" };
      }

      const existingCard = await this.userCardModel.getCardByUserId(userId);
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

      const createdCard = await this.userCardModel.createCard({
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
        error: String(error?.message || error),
      };
    }
  }

  async getCardByUserId(req: Request) {
    try {
      const userId = Number(req.params.user_id);

      if (!Number.isInteger(userId) || userId <= 0) {
        return { status: 400, message: "Invalid user_id" };
      }

      const user = await this.userCardModel.getUserById(userId);
      if (!user) {
        return { status: 404, message: "User not found" };
      }

      const card = await this.userCardModel.getCardByUserId(userId);
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
        error: String(error?.message || error),
      };
    }
<<<<<<< Updated upstream
  }

  async scanQr(req: Request) {
    try {
      const payload = req.body as IQrScanRequest;
      const qrValue = payload?.qr_value?.trim();

      if (!qrValue) {
        return { status: 400, message: "qr_value is required" };
      }

      if (!qrValue.startsWith(QR_PREFIX)) {
        return { status: 400, message: "Invalid QR format" };
      }

      const card = await this.userCardModel.getCardByQrValue(qrValue);
      if (!card) {
        return { status: 404, message: "QR does not exist" };
      }

      if (!card.is_active) {
        return { status: 409, message: "Card is inactive" };
      }

      const user = await this.userCardModel.getUserById(card.user_id);
      if (!user) {
        return { status: 404, message: "User linked to card does not exist" };
      }

      if (!user.is_active) {
        return { status: 409, message: "User linked to card is inactive" };
      }

      return {
        status: 200,
        message: "QR resolved successfully",
        data: {
          card_id: card.card_id,
          user_id: user.user_id,
          user_nm: user.user_nm,
          user_lt: user.user_lt,
          qr_value: card.qr_value,
          card_is_active: card.is_active,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        message: "Internal Server Error",
        error: String(error?.message || error),
      };
    }
  }

  async registerAttendance(req: Request) {
    try {
      const payload = req.body as IAttendanceRegisterRequest;
      const serviceEventId = Number(payload?.service_event_id);
      const userId = await getUserToken(req);
      const attendanceStatusId = payload?.attendance_status_id
        ? Number(payload.attendance_status_id)
        : DEFAULT_ATTENDANCE_STATUS_ID;

      if (!Number.isInteger(serviceEventId) || serviceEventId <= 0) {
        return { status: 400, message: "Evento invalido" };
      }

      if (!Number.isInteger(userId.user_id) || userId.user_id <= 0) {
        return { status: 400, message: "Usuario invalido" };
      }

      if (!Number.isInteger(attendanceStatusId) || attendanceStatusId <= 0) {
        return { status: 400, message: "Codigo de asistencia invalido." };
      }

      const user = await this.userCardModel.getUserById(userId.user_id);
      if (!user) {
        return { status: 404, message: "User not found" };
      }

      if (!user.is_active) {
        return { status: 409, message: "El usuario esta inactivo." };
      }

      const card = await this.userCardModel.getCardByUserId(userId.user_id);
      if (!card) {
        return { status: 404, message: "Carnet no encontrado." };
      }

      if (!card.is_active) {
        return { status: 409, message: "Carnet inactivo." };
      }

      const event =
        await this.userCardModel.getServiceEventById(serviceEventId);
      if (!event) {
        return { status: 404, message: "Evento no encontrado." };
      }

      if (!event.is_active) {
        return { status: 409, message: "El evento esta inactivo." };
      }

      const alreadyRegistered = await this.userCardModel.attendanceExists(
        serviceEventId,
        userId.user_id,
      );

      if (alreadyRegistered) {
        return {
          status: 409,
          message:
            "La asistencia para este usuario ha sido registrada para este evento.",
        };
      }

      const attendance = await this.userCardModel.createAttendance({
        service_event_id: serviceEventId,
        user_id: userId.user_id,
        attendance_status_id: attendanceStatusId,
        notes: payload?.notes,
      });

      return {
        status: 201,
        message: "Asistencia registrada exitosamente",
        data: attendance,
      };
    } catch (error: any) {
      return {
        status: 500,
        message: "Internal Server Error",
        error: String(error?.message || error),
      };
    }
  }
=======

    async scanQr(req: Request): Promise<IResponse> {
        try {
            const model = new UserCardModel()
            const { qr_value } = req.body

            if (!qr_value) {
                return { statusCode: 400, message: 'qr_value is required' }
            }

            if (!qr_value.startsWith(QR_PREFIX)) {
                return { statusCode: 400, message: 'Invalid QR format' }
            }

            const [card] = await model.getCardByQrValue(qr_value)
            if (!card) {
                return { statusCode: 404, message: 'QR does not exist' }
            }

            if (!card.is_active) {
                return { statusCode: 409, message: 'Card is inactive' }
            }

            if (!card.status) {
                return { statusCode: 409, message: 'User linked to card is inactive' }
            }

            return {
                statusCode: 200,
                message: 'QR resolved successfully',
                data: {
                    card_id: card.card_id,
                    user_id: card.user_id,
                    user_nm: card.name,
                    qr_value: card.qr_value,
                    card_is_active: card.is_active,
                },
            }
        } catch (error: any) {
            return {
                statusCode: 500,
                message: 'Internal Server Error',
                errorMessage: String(error?.message || error),
            }
        }
    }

    async registerAttendance(req: Request): Promise<IResponse> {
        try {
            const attendanceModel = new AttendanceModel()
            const { attendance_status_id, service_event_id, notes } = req.body
            const userId = await getUserId(req)

            const card = await this.model.getById(userId)
            if (!card) {
                return { statusCode: 404, message: 'Carnet no encontrado.' }
            }

            if (!card.is_active) {
                return { statusCode: 409, message: 'Carnet inactivo.' }
            }

            const event = await this.model.getById(service_event_id)
            if (!event) {
                return { statusCode: 404, message: 'Evento no encontrado.' }
            }

            if (!event.is_active) {
                return { statusCode: 409, message: 'El evento esta inactivo.' }
            }

            const attendance = await attendanceModel.add(
                {
                    service_event_id: service_event_id,
                    user_id: userId,
                    attendance_status_id: attendance_status_id,
                    notes: notes || '',
                },
                userId,
            )

            return {
                statusCode: 201,
                message: 'Asistencia registrada exitosamente',
            }
        } catch (error: any) {
            return {
                statusCode: 500,
                message: 'Internal Server Error',
                errorMessage: String(error?.message || error),
            }
        }
    }
>>>>>>> Stashed changes
}
