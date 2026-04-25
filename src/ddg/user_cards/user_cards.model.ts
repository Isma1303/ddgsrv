import Model from '../../system/model'
import { IUserCard, IUserCardNew, IUserCardUpdate } from './user_cards.interface'

export class UserCardModel extends Model<IUserCard, IUserCardNew, IUserCardUpdate> {
    constructor() {
        super()
        this.schemaName = 'ddg'
        this.tableName = 'user_cards'
        this.tableId = 'card_id'
        this.tableAlias = 'uc'
        this.tableFields = [
            {
                name: 'card_id',
                description: 'id autogenerado',
                required: false,
            },
            {
                name: 'user_id',
                description: 'id del usuario',
                required: true,
            },
            {
                name: 'card_uuid',
                description: 'uuid autogenerado',
                required: true,
            },
            {
                name: 'qr_value',
                description: 'codigo qr',
                required: true,
            },
            {
                name: 'is_active',
                description: 'estado de la tarjeta',
                required: true,
            },
        ]
    }

    public async getCardByUserId(user_id: number) {
        try {
            const pool = await this.connection.getConnection()
            const query = pool
                .select('*')
                .from(`${this.schemaName}.${this.tableName} as ${this.tableAlias}`)
                .join('admin.users as u', 'u.user_id', `${this.tableAlias}.user_id`)
                .where(`${this.tableAlias}.user_id`, user_id)
                .limit(1)

            return query
        } catch (error: any) {
            throw error
        }
    }
}
