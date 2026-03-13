import { Model } from "../../system/model";
import {
  IAttendanceInsert,
  IServiceEventBasicInfo,
  IUserBasicInfo,
  IUserCard,
  IUserCardNew,
  IUserCardUpdate,
} from "./user_card.interface";

export class UserCardModel extends Model<
  IUserCard,
  IUserCardNew,
  IUserCardUpdate
> {
  constructor() {
    super();
    this.tableSchema = "ddg";
    this.tableName = "user_cards";
    this.tableAlias = "uc";
    this.tableKey = "card_id";
    this.tableColumns = [
      {
        field: "card_id",
        description: "Primary key for the user card",
        type: "number",
        required: false,
      },
      {
        field: "user_id",
        description: "Foreign key referencing the user",
        type: "number",
        required: true,
      },
      {
        field: "card_uuid",
        description: "Unique identifier for the card",
        type: "string",
        required: true,
      },
      {
        field: "qr_value",
        description: "Value encoded in the QR code",
        type: "string",
        required: true,
      },
      {
        field: "is_active",
        description: "Indicates if the card is active",
        type: "boolean",
        required: true,
      },
      {
        field: "created_at",
        description: "Timestamp when the card was created",
        type: "date",
        required: false,
      },
      {
        field: "updated_at",
        description: "Timestamp when the card was last updated",
        type: "date",
        required: false,
      },
    ];
  }

  async getUserById(userId: number): Promise<IUserBasicInfo | undefined> {
    const pool = await this.pool();
    const user = await pool<IUserBasicInfo>("admin.users")
      .select("user_id", "user_nm", "user_lt", "is_active")
      .where({ user_id: userId })
      .first();

    return user;
  }

  async getCardByUserId(userId: number): Promise<IUserCard | undefined> {
    const pool = await this.pool();
    const card = await pool<IUserCard>("ddg.user_cards")
      .select(
        "card_id",
        "user_id",
        "card_uuid",
        "qr_value",
        "is_active",
        "created_at",
        "updated_at",
      )
      .where({ user_id: userId })
      .first();

    return card;
  }

  async getCardByQrValue(qrValue: string): Promise<IUserCard | undefined> {
    const pool = await this.pool();
    const card = await pool<IUserCard>("ddg.user_cards")
      .select(
        "card_id",
        "user_id",
        "card_uuid",
        "qr_value",
        "is_active",
        "created_at",
        "updated_at",
      )
      .where({ qr_value: qrValue })
      .first();

    return card;
  }

  async createCard(data: IUserCardNew): Promise<IUserCard> {
    const pool = await this.pool();
    const [card] = await pool<IUserCard>("ddg.user_cards")
      .insert(data)
      .returning([
        "card_id",
        "user_id",
        "card_uuid",
        "qr_value",
        "is_active",
        "created_at",
        "updated_at",
      ]);

    return card;
  }

  async getServiceEventById(
    serviceEventId: number,
  ): Promise<IServiceEventBasicInfo | undefined> {
    const pool = await this.pool();
    const event = await pool<IServiceEventBasicInfo>("ddg.service_events")
      .select("service_event_id", "is_active")
      .where({ service_event_id: serviceEventId })
      .first();

    return event;
  }

  async attendanceExists(
    serviceEventId: number,
    userId: number,
  ): Promise<boolean> {
    const pool = await this.pool();
    const existing = await pool("ddg.attendance")
      .select("service_event_id")
      .where({ service_event_id: serviceEventId, user_id: userId })
      .first();

    return Boolean(existing);
  }

  async createAttendance(data: IAttendanceInsert): Promise<IAttendanceInsert> {
    const pool = await this.pool();
    const [attendance] = await pool<IAttendanceInsert>("ddg.attendance")
      .insert(data)
      .returning([
        "service_event_id",
        "user_id",
        "attendance_status_id",
        "notes",
      ]);

    return attendance;
  }
}
