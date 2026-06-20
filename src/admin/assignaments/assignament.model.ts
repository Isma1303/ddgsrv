import { Model } from "../../system/model";
import { IUserAssignament } from "./assignament.interface";

export class AssignamentModel extends Model<never, never, never> {
    constructor() {
        super()
        this.tableSchema = 'admin'
        this.tableName = 'user_roles'
        this.tableColumns = [
            {
                field: 'user_id',
                type: 'number',
                required: true,
                description: 'ID del usuario'
            },
            {
                field: 'role_id',
                type: 'number',
                required: true,
                description: 'ID del rol'
            }
        ]
    }

    async deleteAssignament(user_id: number, role_id: number) {
        const db = await this.pool()
        const query = db.raw(
            `
            DELETE FROM admin.user_roles
            WHERE user_id = ? AND role_id = ?
            `,
            [user_id, role_id]
        )
        const result = query
    }

    async assign(data: IUserAssignament) {
        const pool = await this.pool()
        const transaction = await pool.transaction()
        try {
            const result = await transaction.insert(data).into(`ddg.department_members`)
            await transaction.commit()
            return result
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }

    async getAssignaments() {
        try {
            const pool = await this.pool()
            const result = await pool.select('*').from('ddg.department_members')
            return result
        } catch (error) {
            throw error
        }
    }

}