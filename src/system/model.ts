import { Knex } from "knex";
import { db } from "./db/knex.config";
import { ModelTableColumns } from "./shared/interfaces/model.interface";

export class Model<T, TNew, TUpdate> {
    tableKey: string;
    tableName: string;
    tableSchema: string;
    tableColumns: ModelTableColumns[];
    tableAlias?: string;
    constructor() {
        this.tableKey = ""
        this.tableName = ""
        this.tableSchema = ""
        this.tableColumns = []
        this.tableAlias = undefined
    }

    async pool(): Promise<Knex> {
        const pool = db
        return pool
    }

    async getAll(): Promise<T[]> {
        try {
            const pool = db
            const result = await pool.select().from(`${this.tableSchema}.${this.tableName}`)
            return result
        } catch (error: any) {
            throw error.message
        }
    }

    async getById(id: number): Promise<T> {
        try {
            const pool = db
            const result = await pool.select().from(`${this.tableSchema}.${this.tableName}`).where(this.tableKey, id)
            return result[0]

        } catch (error: any) {
            throw error.message
        }
    }

    async create(data: TNew) {
        const pool = db
        const transaction = await pool.transaction()
        try {
            if (this.tableAlias) {
                const result = await transaction.insert(data).into(`${this.tableSchema}.${this.tableName}`).as(this.tableAlias)
                await transaction.commit()
                return result
            }
            const result = await transaction.insert(data).into(`${this.tableSchema}.${this.tableName}`)
            await transaction.commit()
            return result
        } catch (error: any) {
            await transaction.rollback()
            throw error.message
        }
    }

    async update(id: number, data: TUpdate) {
        const pool = db
        const transaction = await pool.transaction()
        try {
            const result = await transaction.update(data).into(`${this.tableSchema}.${this.tableName}`).where(this.tableKey, id)
            await transaction.commit()
            return result
        } catch (error: any) {
            await transaction.rollback()
            throw error.message
        }
    }

    async delete(id: number) {
        const pool = db
        const transaction = await pool.transaction()
        try {
            const result = await transaction.delete().from(`${this.tableSchema}.${this.tableName}`).where(this.tableKey, id)
            await transaction.commit()
            return result
        } catch (error: any) {
            await transaction.rollback()
            throw error.message
        }
    }
}