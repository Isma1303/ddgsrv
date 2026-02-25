import { Knex } from 'knex'
import Model from '../../system/model'
import { atob, encryptText } from '../../system/utils/crypt.utils'
import { InvalidStructureError } from '../../system/errors/model.error'
import { UpdateByIdParams } from '../../system/interfaces/model.interface'
import { getEditAuditFields } from '../../system/utils/audit.utils'
import { IUser, IUserNew, IUserUpdate } from './user.interface'

export default class UserModel extends Model<IUser, IUserNew, IUserUpdate> {
    constructor() {
        super()
        this.connectionName = 'DB_ADMIN'
        this.schemaName = 'admin'
        this.tableName = 'Users'
        this.tableId = 'user_id'
        this.tableFields = [
            {
                name: 'user_id',
                description: 'Identificador único de la tabla users',
                required: false,
            },
            {
                name: 'user',
                description: 'user dentro de la aplicación',
                required: true,
                maxLength: 200,
            },
            {
                name: 'name',
                description: 'Nombre del user',
                required: true,
                maxLength: 50,
            },
            {
                name: 'email',
                description: 'Correo electrónico',
                required: false,
                maxLength: 200,
            },
            {
                name: 'password',
                description: 'Contraseña del user',
                required: true,
                maxLength: 100,
            },
            {
                name: 'status',
                description: 'Estado del user',
                required: true,
            },
        ]
        this.fieldNames = this.getFieldsString()
    }

    async add(record: IUserNew): Promise<IUser | null> {
        try {
            const invalidFields = this.validateFields(record)
            if (invalidFields.length !== 0)
                throw new InvalidStructureError('The record structure does not meet the minimum requirements', invalidFields)

            record.password = await encryptText(atob(record.password!), 10)
            const pool: Knex = await this.connection.getConnection(this.connectionName)
            const insertedRecord = await pool!.insert(record).into(`${this.schemaName}.${this.tableName}`).returning(this.fieldNames)
            return insertedRecord.length > 0 ? insertedRecord[0] : null
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    async updateById({ id, record, userId }: UpdateByIdParams<IUserUpdate>): Promise<IUser | null> {
        try {
            const invalidFields = this.validateFields(record, false)
            if (invalidFields.length !== 0)
                throw new InvalidStructureError('The record structure does not meet the minimum requirements', invalidFields)

            if (record.password) record.password = await encryptText(atob(record.password), 10)

            if (this.addAuditFields) record = getEditAuditFields(record, userId)

            const pool: Knex = await this.connection.getConnection(this.connectionName)
            return await pool!.update(record).from(`${this.schemaName}.${this.tableName}`).where(this.tableId, id).returning(this.fieldNames)
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    public async getActions(userId: number): Promise<Record<string, any>[]> {
        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)

            const query = pool!.select('action', 'table_name', 'write_permission').from(`${this.schemaName}.vw_user_actions`).where('user_id', userId)

            return await query
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }
}
