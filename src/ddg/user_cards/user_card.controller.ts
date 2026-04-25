import Controller from '../../system/controller'
import { IUserCard, IUserCardNew, IUserCardUpdate } from './user_cards.interface'
import { UserCardModel } from './user_cards.model'
import { v4 as uuidv4 } from 'uuid'
import { Request } from 'express'
import UserModel from '../../security/user/user.model'
import { getUserId } from '../../system/utils/auth.utils'

const QRCode = require('qrcode') as {
    toDataURL: (value: string) => Promise<string>
}

const QR_PREFIX = 'DDG-CARD:'
const DEFAULT_ATTENDANCE_STATUS_ID = 1

export class UserCardController extends Controller<IUserCard, IUserCardNew, IUserCardUpdate> {
    constructor() {
        super()
        this.model = new UserCardModel()
    }

    async createCard(req: Request) {
        try {
            const userModel = new UserModel()
            const model = new UserCardModel()
            const userId = req.body?.user_id

            if (!Number.isInteger(userId) || userId <= 0) {
                return { status: 400, message: 'Invalid user_id' }
            }

            const user = await userModel.getById(userId)
            if (user?.status == false) {
                return { status: 404, message: 'User not found' }
            }

            const existingCard: IUserCard[] = await model.getCardByUserId(userId)

            if (existingCard.length > 0) {
                const qrImageDataUrl = await QRCode.toDataURL(existingCard[0].qr_value)
                return {
                    status: 409,
                    message: 'User already has a card',
                    data: {
                        ...existingCard,
                        qr_image_data_url: qrImageDataUrl,
                    },
                }
            }

            const cardUuid = uuidv4()
            const qrValue = `${QR_PREFIX}${cardUuid}`

            const createdCard = await model.add(
                {
                    user_id: userId,
                    card_uuid: cardUuid,
                    qr_value: qrValue,
                    is_active: true,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                userId,
            )

            const qrImageDataUrl = await QRCode.toDataURL(qrValue)

            return {
                status: 201,
                message: 'Card created successfully',
                data: {
                    ...createdCard,
                    qr_image_data_url: qrImageDataUrl,
                },
            }
        } catch (error: any) {
            return {
                status: 500,
                message: 'Internal Server Error',
                error: String(error?.message || error),
            }
        }
    }
}
