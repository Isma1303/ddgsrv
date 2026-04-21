import { DatabaseError, InvalidStructureError } from './errors/model.error'
import { connection } from './database/connection'
import Field, { IJoinField } from './interfaces/field.inteface'
import Condition from './interfaces/condition.interface'
import { getCreationAuditFields, getEditAuditFields } from './utils/audit.utils'
import { Knex } from 'knex'
import {
    SearchParams,
    GetAllParams,
    UpdateByIdParams,
    MultipleUpdateParams,
    ModelProperties,
    DeletedResponse,
    InvalidField,
    ValidationError,
    UpdatedResponse,
    AffectedRecordsByQueryResponse,
    LoadDataResponse,
    ExecSpParams,
    GetByIdOptions,
    GetTotalRecordsOptions,
    GetAffectedRecordsByQueryOptions,
    BuilderJoinParams,
} from './interfaces/model.interface'
import { HttpStatusCodes } from './interfaces/http_status_codes'
import { GenericError } from './errors/error'
import {
    IAddOptions,
    IBatchInsertOptions,
    IExecSpOptions,
    ITruncateTableOptions,
    IDeleteOptions,
    IUpdateOptions,
} from './interfaces/extra_params_model.interface'
import { ParamsUploadDataSPO } from './interfaces/excel_data_loading_parameters.interface'
/**
 * @class Model
 * @description Clase `Model` que proporciona operaciones generales de CRUD en una tabla de base de datos, junto con funciones adicionales de validación y manejo de errores.
 */
export default class Model<T, TNew, TUpdate> {
    noFilterRLSAllowed: boolean
    connectionName: string
    schemaName: string
    tableName: string
    tableAlias?: string
    tableId: string
    assignmentIds: string[]
    tableFields: Field[]
    fieldNames: string[] = ['*']
    fieldsSelectQuery: string[] = []
    connection = connection
    filterUser = false
    addAuditFields = false
    thereIsRawSelect = false
    // eslint-disable-next-line no-unused-vars
    getFilteredUserRecords: (userId: number, tableFields: string[]) => Promise<Record<string, any>[]>

    constructor() {
        this.noFilterRLSAllowed = false
        this.connectionName = ''
        this.schemaName = this.getSchema(this.connectionName)
        this.tableName = ''
        this.tableId = ''
        this.assignmentIds = []
        this.tableFields = []
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { getFilteredUserRecords } = require('./utils/auth.utils')
        this.getFilteredUserRecords = getFilteredUserRecords
    }

    /**
     * Obtiene las propiedades del modelo, incluyendo el nombre de la tabla, el ID de la tabla, los campos de la tabla y los nombres de los campos.
     * @returns {ModelProperties[]} Propiedades del modelo.
     */
    getModelProperties(): ModelProperties {
        const properties: ModelProperties = {
            tableName: this.tableName,
            tableId: this.tableId,
            tableFields: this.tableFields,
            fieldNames: this.fieldNames,
        }
        return properties
    }

    // General model operations

    /**
     * Recupera todos los registros de la tabla según los parámetros proporcionados.
     * @param {GetAllParams} params - Parámetros de consulta incluyendo ordenación, límite y usuario.
     * @returns {Promise<Record<string, any>[]>} Promesa con el arreglo de registros encontrados.
     * @throws {DatabaseError} Error en caso de fallo en la consulta.
     */
    async getAll({
        sort = this.tableId || this.assignmentIds[0],
        offset = 0,
        limit = 10,
        userId = 0,
        directionSort = 'asc',
        noFilterRLS,
        customFilterRLSExternal,
    }: GetAllParams): Promise<T[]> {
        let filteredUserRecords: Record<string, any>[] = []
        if (this.isAllowToFilterRLS(noFilterRLS)) {
            filteredUserRecords = await this.getFilteredUserRecords(userId, this.fieldNames)
        }

        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)
            let fields = this.thereIsRawSelect ? this.getFieldsSelectQuery(pool) : this.fieldNames
            let selectFrom = `${this.schemaName}.${this.tableName}`
            if (this.tableAlias) {
                fields = this.thereIsRawSelect
                    ? this.getFieldsSelectQuery(pool).map((row) => (typeof row === 'string' ? `${this.tableAlias}.${row}` : row))
                    : this.fieldNames.map((row) => `${this.tableAlias}.${row}`)
                selectFrom += ` AS ${this.tableAlias}`
                sort = `${this.tableAlias}.${sort}`
            }
            const query = pool.select(fields).from(selectFrom).orderBy(sort, directionSort)

            if (limit > -1) {
                query.limit(limit).offset(offset)
            }

            if (this.isAllowToFilterRLS(noFilterRLS) && filteredUserRecords.length > 0) {
                const filters: Record<string, number[]> = {}
                customFilterRLSExternal
                    ? customFilterRLSExternal(filteredUserRecords, query, { model: this })
                    : this.customFilterRLS(filteredUserRecords, query, { model: this })
                filteredUserRecords.forEach((record) => {
                    if (this.fieldNames.includes(record.field)) {
                        if (!filters[record.field]?.find((e: number) => e === record.record_id) || false) {
                            filters[record.field] = filters[record.field]?.concat([record.record_id]) || [record.record_id]
                        }
                    }
                })
                // for (const k in filters) query.whereIn(k, filters[k])
                for (const k in filters) query.whereIn(this.tableAlias ? `${this.tableAlias}.${k}` : k, filters[k])
            }

            if (this.tableAlias) {
                this.tableFields
                    .filter((field) => !!field.join)
                    .forEach((field) => {
                        if (Array.isArray(field.join)) {
                            field.join.forEach((join) => {
                                const fieldsJoin = join!.select.map((row) => `${join!.alias}.${row}`)
                                query.select(fieldsJoin)
                                query.leftJoin(
                                    `${join!.table} AS ${join!.alias}`,
                                    `${join!.alias}.${join!.field}`,
                                    `${this.tableAlias}.${field.name}`,
                                )
                            })
                            return
                        }
                        const join = field.join as IJoinField
                        const fieldsJoin = join.select.map((row) => `${join.alias}.${row}`)
                        query.select(fieldsJoin)
                        query.leftJoin(`${join.table} AS ${join.alias}`, `${join.alias}.${join.field}`, `${this.tableAlias}.${field.name}`)
                    })
            }

            if (this.fieldNames.includes('user_id') && this.tableName.toLocaleLowerCase() !== 'users' && this.filterUser && userId) {
                query.where('user_id', userId)
            }

            return await query
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    /**
     * Recupera un registro específico por su ID.
     * @param {number} id - ID del registro a recuperar.
     * @param {number} userId - ID del usuario para filtrar registros si es necesario.
     * @returns {Promise<Record<string, any>[]>} Promesa con el registro encontrado.
     * @throws {DatabaseError} Error en caso de fallo en la consulta.
     */
    async getById(id: number, userId = 0, options?: GetByIdOptions): Promise<T | null> {
        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)
            let fields = this.thereIsRawSelect ? this.getFieldsSelectQuery(pool) : this.fieldNames
            let selectFrom = `${this.schemaName}.${this.tableName}`
            if (this.tableAlias) {
                fields = this.thereIsRawSelect
                    ? this.getFieldsSelectQuery(pool).map((row) => (typeof row === 'string' ? `${this.tableAlias}.${row}` : row))
                    : this.fieldNames.map((row) => `${this.tableAlias}.${row}`)
                selectFrom += ` AS ${this.tableAlias}`
            }
            const whereColumn = this.tableAlias ? `${this.tableAlias}.${this.tableId}` : this.tableId
            const query = pool!.select(fields).from(selectFrom).where(whereColumn, id)

            if (this.tableAlias) {
                this.tableFields
                    .filter((field) => !!field.join)
                    .forEach((field) => {
                        if (Array.isArray(field.join)) {
                            field.join.forEach((join) => {
                                const fieldsJoin = join!.select.map((row) => `${join!.alias}.${row}`)
                                query.select(fieldsJoin)
                                query.leftJoin(
                                    `${join!.table} AS ${join!.alias}`,
                                    `${join!.alias}.${join!.field}`,
                                    `${this.tableAlias}.${field.name}`,
                                )
                            })
                            return
                        }
                        const join = field.join as IJoinField
                        const fieldsJoin = join.select.map((row) => `${join.alias}.${row}`)
                        query.select(fieldsJoin)
                        query.leftJoin(`${join.table} AS ${join.alias}`, `${join.alias}.${join.field}`, `${this.tableAlias}.${field.name}`)
                    })
            }

            if (this.isAllowToFilterRLS(options?.noFilterRLS) && userId && this.tableName.toLocaleLowerCase() !== 'users') {
                const filteredUserRecords = await this.getFilteredUserRecords(userId, this.fieldNames)
                if (filteredUserRecords.length > 0) {
                    const filters: Record<string, number[]> = {}
                    options?.customFilterRLSExternal
                        ? options.customFilterRLSExternal(filteredUserRecords, query, { model: this })
                        : this.customFilterRLS(filteredUserRecords, query, { model: this })
                    filteredUserRecords.forEach((record) => {
                        if (this.fieldNames.includes(record.field)) {
                            if (!filters[record.field]?.find((e: number) => e == record.record_id) || false) {
                                filters[record.field] = filters[record.field]?.concat([record.record_id]) || [record.record_id]
                            }
                        }
                    })
                    // for (const k in filters) query.whereIn(k, filters[k])
                    for (const k in filters) query.whereIn(this.tableAlias ? `${this.tableAlias}.${k}` : k, filters[k])
                }
            }
            query.first()
            return (await query) as T | null
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    /**
     * Cuenta el total de registros en la tabla, opcionalmente filtrados por el usuario.
     * @param {number} userId - ID del usuario para filtrar los registros.
     * @returns {Promise<Record<string, any>[]>} Promesa con el número total de registros.
     * @throws {DatabaseError} Error en caso de fallo en la consulta.
     */
    async getTotalRecords(userId = 0, options?: GetTotalRecordsOptions): Promise<{ totalRecords: number }> {
        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)
            const query = pool!.count('* as totalRecords').from(`${this.schemaName}.${this.tableName}`)

            if (this.fieldNames.includes('user_id') && this.tableName.toLocaleLowerCase() !== 'users' && userId) query.where('user_id', userId)

            if (this.isAllowToFilterRLS(options?.noFilterRLS) && userId && this.tableName.toLocaleLowerCase() !== 'users') {
                const filteredUserRecords = await this.getFilteredUserRecords(userId, this.fieldNames)
                if (filteredUserRecords.length > 0) {
                    const filters: Record<string, number[]> = {}
                    options?.customFilterRLSExternal
                        ? options.customFilterRLSExternal(filteredUserRecords, query, { model: this })
                        : this.customFilterRLS(filteredUserRecords, query, { model: this })
                    filteredUserRecords.forEach((record) => {
                        if (this.fieldNames.includes(record.field)) {
                            if (!filters[record.field]?.find((e: number) => e == record.record_id) || false) {
                                filters[record.field] = filters[record.field]?.concat([record.record_id]) || [record.record_id]
                            }
                        }
                    })
                    // for (const k in filters) query.whereIn(k, filters[k])
                    for (const k in filters) query.whereIn(this.tableAlias ? `${this.tableAlias}.${k}` : k, filters[k])
                }
            }

            const result = await query.first()
            return result as { totalRecords: number }
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    /**
     * Realiza una búsqueda en la tabla con condiciones específicas.
     * @param {SearchParams} params - Parámetros de búsqueda incluyendo condiciones, ordenación, etc.
     * @returns {Promise<T[]>} Promesa con los resultados de la búsqueda.
     * @throws {DatabaseError} Error en caso de fallo en la consulta.
     */
    async search({
        conditions,
        sort = this.tableId || this.assignmentIds[0],
        offset = 0,
        limit = 10,
        userId = 0,
        directionSort = 'asc',
        extraFieldsModelToGet = [],
        noFilterRLS,
        customFilterRLSExternal,
    }: SearchParams): Promise<T[]> {
        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)
            let fields = this.thereIsRawSelect ? this.getFieldsSelectQuery(pool) : this.fieldNames
            if (extraFieldsModelToGet.length > 0) {
                fields = fields.concat(extraFieldsModelToGet)
            }
            let selectFrom = `${this.schemaName}.${this.tableName}`
            if (this.tableAlias) {
                const joinedFields: string[] = []
                this.tableFields
                    .filter((field) => !!field.join)
                    .forEach((field) => {
                        if (Array.isArray(field.join)) {
                            field.join.forEach((join) => {
                                joinedFields.push(...join.select.map((field) => `${join.alias}.${field}`))
                            })
                            return
                        }
                        const join = field.join as IJoinField
                        joinedFields.push(...join.select.map((field) => `${join.alias}.${field}`))
                    })

                conditions = conditions.map((condition) => {
                    const joinedField = joinedFields.filter((field) => field.split('.')[1] === condition.field)[0]
                    condition.field = joinedField ?? `${this.tableAlias}.${condition.field}`
                    return condition
                })

                fields = this.thereIsRawSelect
                    ? this.getFieldsSelectQuery(pool).map((row) => (typeof row === 'string' ? `${this.tableAlias}.${row}` : row))
                    : this.fieldNames.map((row) => `${this.tableAlias}.${row}`)
                if (extraFieldsModelToGet.length > 0) {
                    fields = fields.concat(extraFieldsModelToGet.map((field) => `${this.tableAlias}.${field}`))
                }
                selectFrom += ` AS ${this.tableAlias}`
            }
            let query = pool!.select(fields).from(selectFrom).orderBy(sort, directionSort)

            if (limit > -1) {
                query.limit(limit).offset(offset)
            }
            query = this.addConditions(conditions, query)
            if (this.tableAlias) {
                this.tableFields
                    .filter((field) => !!field.join)
                    .forEach((field) => {
                        if (Array.isArray(field.join)) {
                            field.join.forEach((join) => {
                                query = this.builderJoin({ join, query, tableAlias: this.tableAlias!, field, conditions })
                            })
                            return
                        }
                        const join = field.join as IJoinField
                        query = this.builderJoin({ join, query, tableAlias: this.tableAlias!, field, conditions })
                    })
            }
            if (this.isAllowToFilterRLS(noFilterRLS) && userId && this.tableName.toLocaleLowerCase() !== 'users') {
                const filteredUserRecords = await this.getFilteredUserRecords(userId, this.fieldNames)
                if (filteredUserRecords.length > 0) {
                    const filters: Record<string, number[]> = {}
                    customFilterRLSExternal
                        ? customFilterRLSExternal(filteredUserRecords, query, { model: this })
                        : this.customFilterRLS(filteredUserRecords, query, { model: this })
                    filteredUserRecords.forEach((record) => {
                        if (this.fieldNames.includes(record.field)) {
                            if (!filters[record.field]?.find((e: number) => e == record.record_id) || false) {
                                filters[record.field] = filters[record.field]?.concat([record.record_id]) || [record.record_id]
                            }
                        }
                    })
                    for (const k in filters) query.whereIn(this.tableAlias ? `${this.tableAlias}.${k}` : k, filters[k])
                }
            }

            return (await query) as T[]
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    /**
     * Inserta un nuevo registro en la tabla.
     * @param {TNew} record - El registro a insertar.
     * @param {number} userId - ID del usuario que realiza la operación.
     * @returns {Promise<T>} Promesa con el registro insertado.
     * @throws {InvalidStructureError} Error si el registro no cumple con las validaciones.
     * @throws {DatabaseError} Error en caso de fallo en la consulta.
     */
    async add(record: TNew, userId: number, options?: IAddOptions): Promise<T | null> {
        try {
            const invalidFields = this.validateFields(record as Record<string, any>)
            if (invalidFields.length !== 0)
                throw new InvalidStructureError('The record structure does not meet the minimum requirements', invalidFields)

            const pool: Knex = options?.transaction ? options.transaction : await this.connection.getConnection(this.connectionName)

            if (this.addAuditFields) record = getCreationAuditFields(record, userId)

            const added = await pool!.insert(record).into(`${this.schemaName}.${this.tableName}`).returning(this.fieldNames)
            return added.length > 0 ? (added[0] as T) : null
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    /**
     * Inserta varios registros en la tabla.
     * @param {TNew[]} records - Arreglo de registros a insertar.
     * @param {number} userId - ID del usuario que realiza la operación.
     * @returns {Promise<number[]>} Promesa con los registros insertados.
     * @throws {DatabaseError} Error en caso de fallo en la consulta.
     */
    async batchInsert(records: TNew[], userId: number, options?: IBatchInsertOptions): Promise<number[]> {
        const pool: Knex = options?.transaction ? options.transaction : await this.connection.getConnection(this.connectionName)
        try {
            if (options?.truncateTable) {
                await this.truncateTable({
                    tableName: options?.tableName || `${this.schemaName}.${this.tableName}`,
                    transaction: options?.transaction,
                })
            }
            if (this.addAuditFields) {
                records = records.map((record) => {
                    return getCreationAuditFields(record, userId)
                })
            }
            const maxParams = 2000 // 100 menos que la cantidad límite
            const columns = Math.max(...records.map((record) => Object.keys(record as Record<string, any>).length))
            const maxBatchSize = Math.floor(maxParams / columns)
            const insertedIds = await pool.batchInsert(options?.tableName || `${this.schemaName}.${this.tableName}`, records as any[], maxBatchSize)
            return insertedIds
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    /**
     * Elimina un registro por su ID.
     * @param {number} id - ID del registro a eliminar.
     * @returns {Promise<DeletedResponse>} Promesa con la respuesta de la operación de eliminación.
     * @throws {DatabaseError} Error en caso de fallo en la consulta.
     */
    async deleteById(id: number, options?: IDeleteOptions): Promise<DeletedResponse> {
        try {
            const pool: Knex = options?.transaction ? options.transaction : await this.connection.getConnection(this.connectionName)
            const result = await pool!.del().from(`${this.schemaName}.${this.tableName}`).where(this.tableId, id)
            if (result < 1) throw new Error('The record you want to delete does not exist')
            return { deletedId: result }
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    /**
     * Elimina un registro utilizando una clave compuesta.
     * @param {number} firstId - Primer ID de la clave compuesta.
     * @param {number} secondId - Segundo ID de la clave compuesta.
     * @returns {Promise<DeletedResponse>} Promesa con la respuesta de la operación de eliminación.
     * @throws {DatabaseError} Error en caso de fallo en la consulta.
     */
    async deleteByCompositeKey(firstId: number, secondId: number, options?: IDeleteOptions): Promise<DeletedResponse> {
        try {
            const pool: Knex = options?.transaction ? options.transaction : await this.connection.getConnection(this.connectionName)
            const result = await pool!
                .del()
                .from(`${this.schemaName}.${this.tableName}`)
                .where(this.assignmentIds[0], firstId)
                .andWhere(this.assignmentIds[1], secondId)
            if (result !== 0) throw new Error('The record you want to delete does not exist')
            return { deletedId: result }
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    /**
     * Elimina registros que cumplen con las condiciones especificadas.
     * @param {Condition[]} conditions - Condiciones para la eliminación.
     * @returns {Promise<DeletedResponse>} Promesa con la respuesta de la operación de eliminación.
     * @throws {DatabaseError} Error en caso de fallo en la consulta.
     */
    async deleteByCondition(conditions: Condition[], options?: IDeleteOptions): Promise<DeletedResponse> {
        try {
            const pool: Knex = options?.transaction ? options.transaction : await this.connection.getConnection(this.connectionName)
            let query = pool!.del().from(`${this.schemaName}.${this.tableName}`)
            query = this.addConditions(conditions, query)
            const result = await query
            return { deletedId: result }
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    /**
     * Actualiza un registro específico por su ID.
     * @param {UpdateByIdParams} params - Parámetros de la actualización incluyendo ID, registro y usuario.
     * @returns {Promise<T>} Promesa con el registro actualizado.
     * @throws {InvalidStructureError} Error si el registro no cumple con las validaciones.
     * @throws {DatabaseError} Error en caso de fallo en la consulta.
     */
    async updateById({ id, record, userId }: UpdateByIdParams<TUpdate>, options?: IUpdateOptions): Promise<T | null> {
        try {
            record = this.removeFieldsNoPresentInModel(record as Record<string, any>)
            const invalidFields = this.validateFields(record as Record<string, any>, false)
            if (invalidFields.length !== 0)
                throw new InvalidStructureError('The record structure does not meet the minimum requirements', invalidFields)

            const pool: Knex = options?.transaction ? options.transaction : await this.connection.getConnection(this.connectionName)

            if (this.addAuditFields && userId) record = getEditAuditFields<TUpdate>(record, userId)

            const result = await pool.update(record).from(`${this.schemaName}.${this.tableName}`).where(this.tableId, id).returning(this.fieldNames)
            return result.length > 0 ? (result[0] as T) : null
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    /**
     * Actualiza múltiples registros según las condiciones especificadas.
     * @param {MultipleUpdateParams} params - Parámetros de la actualización incluyendo registro, condiciones y usuario.
     * @returns {Promise<UpdatedResponse>} Promesa con la respuesta de la operación de actualización.
     * @throws {InvalidStructureError} Error si el registro no cumple con las validaciones.
     * @throws {DatabaseError} Error en caso de fallo en la consulta.
     */
    async multipleUpdate({ record, conditions, userId }: MultipleUpdateParams<TUpdate>, options?: IUpdateOptions): Promise<UpdatedResponse> {
        try {
            const invalidFields = this.validateFields(record as Record<string, any>, false)
            if (invalidFields.length !== 0)
                throw new InvalidStructureError('The record structure does not meet the minimum requirements', invalidFields)

            const pool: Knex = options?.transaction ? options.transaction : await this.connection.getConnection(this.connectionName)

            if (this.addAuditFields) {
                record = getEditAuditFields<TUpdate>(record, userId)
            }

            let update = pool.update(record).from(`${this.schemaName}.${this.tableName}`)

            update = this.addConditions(conditions, update)

            const result = await update

            if (result === 0) throw new Error('The record you want to delete does not exist')

            return { updatedId: result }
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    /**
     * Cuenta los registros afectados por una consulta según las condiciones especificadas.
     * @param {Condition[]} conditions - Condiciones para la consulta.
     * @param {number} userId - ID del usuario que realiza la operación.
     * @returns {Promise<AffectedRecordsByQueryResponse>} Promesa con el conteo de registros afectados.
     * @throws {DatabaseError} Error en caso de fallo en la consulta.
     */
    async getAffectedRecordsByQuery(
        conditions: Condition[],
        userId = 0,
        options?: GetAffectedRecordsByQueryOptions,
    ): Promise<AffectedRecordsByQueryResponse> {
        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)
            let selectFrom = `${this.schemaName}.${this.tableName}`
            if (this.tableAlias) {
                const joinedFields: string[] = []
                this.tableFields
                    .filter((field) => !!field.join)
                    .forEach((field) => {
                        if (Array.isArray(field.join)) {
                            field.join.forEach((join) => {
                                joinedFields.push(...join.select.map((field) => `${join.alias}.${field}`))
                            })
                            return
                        }
                        const join = field.join as IJoinField
                        joinedFields.push(...join.select.map((field) => `${join.alias}.${field}`))
                    })

                conditions = conditions.map((condition) => {
                    const joinedField = joinedFields.filter((field) => field.split('.')[1] === condition.field)[0]
                    condition.field = joinedField ?? `${this.tableAlias}.${condition.field}`
                    return condition
                })

                selectFrom += ` AS ${this.tableAlias}`
            }
            let query = pool!.from(selectFrom).count('* as affectedRecords')

            query = this.addConditions(conditions, query)
            if (this.tableAlias) {
                this.tableFields
                    .filter((field) => !!field.join)
                    .forEach((field) => {
                        if (Array.isArray(field.join)) {
                            field.join.forEach((join) => {
                                query = this.builderJoin({ join, query, tableAlias: this.tableAlias!, field, conditions, applyOnlyOnFrom: true })
                            })
                            return
                        }
                        const join = field.join as IJoinField
                        query = this.builderJoin({ join, query, tableAlias: this.tableAlias!, field, conditions, applyOnlyOnFrom: true })
                    })
            }
            if (this.isAllowToFilterRLS(options?.noFilterRLS) && userId && this.tableName.toLocaleLowerCase() !== 'users') {
                const filteredUserRecords = await this.getFilteredUserRecords(userId, this.fieldNames)
                if (filteredUserRecords.length > 0) {
                    const filters: Record<string, number[]> = {}
                    options?.customFilterRLSExternal
                        ? options?.customFilterRLSExternal(filteredUserRecords, query, { model: this })
                        : this.customFilterRLS(filteredUserRecords, query, { model: this })
                    filteredUserRecords.forEach((record) => {
                        if (this.fieldNames.includes(record.field)) {
                            if (!filters[record.field]?.find((e: number) => e == record.record_id) || false) {
                                filters[record.field] = filters[record.field]?.concat([record.record_id]) || [record.record_id]
                            }
                        }
                    })
                    for (const k in filters) query.whereIn(this.tableAlias ? `${this.tableAlias}.${k}` : k, filters[k])
                }
            }

            const result = await query

            return result[0] as AffectedRecordsByQueryResponse
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    /**
     * Busca un registro en la tabla por una clave específica.
     * @param {string} key - La clave a buscar.
     * @returns {Promise<Record<string, any>>} Promesa con el registro encontrado.
     * @throws {DatabaseError} Error en caso de fallo en la consulta.
     */
    async findByKey(key: string): Promise<T | null> {
        try {
            const pool: Knex = await this.connection.getConnection(this.connectionName)
            const foundedKeys = pool!
                .select(this.fieldNames)
                .from(`${this.schemaName}.${this.tableName}`)
                .where(this.tableId.replace('id', 'cd'), key)
                .first()

            return (await foundedKeys) as T | null
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    /**
     * Carga varios registros en la tabla, con opción de truncar antes de la carga.
     * @param {LoadDataParams} params - Parámetros de carga incluyendo registros, truncado y formato.
     * @returns {Promise<LoadDataResponse>} Promesa con la respuesta de la operación de carga.
     * @throws {DatabaseError} Error en caso de fallo en la consulta.
     */
    async loadData(LoadDataParams: ParamsUploadDataSPO): Promise<LoadDataResponse> {
        try {
            const { records, stgTable, storeProcedureDataProcessing } = LoadDataParams

            const pool: Knex = await this.connection.getConnection(this.connectionName)
            if (!records.length) throw this.errorHandler(new Error('No es posible procesar registros vacíos'))

            const maxParams = 2000 // 100 menos que la cantidad límite
            const columnas = Object.keys(records[0]).length
            const limit = Math.floor(maxParams / columnas)

            await pool(stgTable).truncate()

            const respInsert = await pool.batchInsert(stgTable, records, limit).returning('*')

            await pool.raw(`EXEC ${storeProcedureDataProcessing}`)

            return { recordCount: respInsert.length }
        } catch (err: any) {
            throw this.errorHandler(err)
        }
    }

    async execSp<TT>({ spName, params }: ExecSpParams, options?: IExecSpOptions): Promise<TT> {
        try {
            const pool: Knex = options?.transaction ? options.transaction : await this.connection.getConnection(this.connectionName)
            let query = `EXEC ${spName}`

            if (params) {
                const paramStrings = Object.entries(params).map(([key, value]) => {
                    return `@${key}=${pool.raw('?', [value])}`
                })
                query += ` ${paramStrings.join(', ')}`
            }

            const result = await pool.raw(query)
            return result.recordset
        } catch (error: any) {
            throw this.errorHandler(error)
        }
    }

    async truncateTable(options?: ITruncateTableOptions): Promise<void> {
        const pool: Knex = options?.transaction ? options.transaction : await this.connection.getConnection(this.connectionName)
        await pool(options?.tableName || `${this.schemaName}.${this.tableName}`).truncate()
    }
    // Model functions
    /**
     * Agrega condiciones a una consulta.
     * @param {Condition[]} conditions - Condiciones a agregar.
     * @param {Knex.QueryBuilder} query - Consulta de Knex para agregar las condiciones.
     * @returns {Knex.QueryBuilder} Consulta con las condiciones agregadas.
     */
    protected addConditions(conditions: Condition[], query: Knex.QueryBuilder): Knex.QueryBuilder {
        conditions.forEach((condition) => {
            if (condition.operator === 'between') query.whereBetween(condition.field, [condition.value, condition.comparisonValue])
            else if (condition.operator === 'orLike') query.orWhere(condition.field, 'like', condition.value)
            else if (condition.operator === 'isNull') query.whereNull(condition.field)
            else if (condition.operator === 'orIsNull') query.orWhereNull(condition.field)
            else if (condition.operator === 'isNotNull') query.whereNotNull(condition.field)
            else if (condition.operator === 'orDistinct') query.orWhere(condition.field, '<>', condition.value)
            else if (condition.operator === 'or') query.orWhere(condition.field, '=', condition.value)
            else if (condition.operator === 'in') query.whereIn(condition.field, condition.value)
            else if (condition.operator === 'notIn') query.whereNotIn(condition.field, condition.value)
            else query.where(condition.field, condition.operator || '=', condition.value)
        })
        return query
    }

    /**
     * Valida los campos de un registro.
     * @param {Record<string, any>} record - Registro a validar.
     * @param {boolean} strict - Si es `true`, aplica validaciones estrictas.
     * @returns {InvalidField[]} Arreglo con los campos inválidos.
     */
    protected validateFields(record: Record<string, any>, strict = true): InvalidField[] {
        const invalidFields: InvalidField[] = []

        this.tableFields.forEach((field) => {
            const validations: ValidationError[] = []
            const exists = typeof record[field.name] !== 'undefined'

            if (field.required && strict) {
                if (!exists) {
                    validations.push({
                        invalidCriteria: `The ${field.description} is required`,
                        expectedValue: 'Not null',
                    })
                }
            }

            if (exists) {
                if (field.maxLength && record[field.name]?.length > field.maxLength) {
                    validations.push({
                        invalidCriteria: `The maximum length of the field is ${field.maxLength}`,
                        expectedValue: `String with less than ${field.maxLength} characters`,
                    })
                }
                if (field.minLength && record[field.name]?.length < field.minLength) {
                    validations.push({
                        invalidCriteria: `The minimum length of the field is ${field.minLength}`,
                        expectedValue: `String with more than ${field.minLength} characters`,
                    })
                }
                if (field.maxValue && record[field.name] > field.maxValue) {
                    validations.push({
                        invalidCriteria: `The maximum value of the field is ${field.maxValue}`,
                        expectedValue: `Value less than or equal to ${field.maxValue}`,
                    })
                }
                if (field.minValue && record[field.name] < field.minValue) {
                    validations.push({
                        invalidCriteria: `The minimum value of the field is ${field.minValue}`,
                        expectedValue: `Value greater than or equal to ${field.minValue}`,
                    })
                }
                if (field.regExp) {
                    const regExp = new RegExp(field.regExp)
                    if (!regExp.test(record[field.name])) {
                        validations.push({
                            invalidCriteria: `This field must match the format ${field.regExp}`,
                            expectedValue: `String that meets the format ${field.regExp}`,
                        })
                    }
                }
                if (field.validateFn && !field.validateFn(record[field.name])) {
                    validations.push({
                        invalidCriteria: field.validationCriteria || 'The field does not meet the conditions of the validation function',
                        expectedValue: field.expectedValue || 'Different from current',
                    })
                }
            }

            if (validations.length > 0) {
                invalidFields.push({ field: field.name, validations })
            }
        })

        return invalidFields
    }

    /**
     * Maneja y lanza errores de la base de datos.
     * @param {any} error - El error capturado.
     * @returns {Error} Error personalizado de base de datos.
     */
    protected errorHandler(error: any): Error {
        if (error instanceof InvalidStructureError || error instanceof GenericError) throw error
        const errorMessage: string = this.getSQLError(error, this.connection.getClient(this.connectionName))
        return new DatabaseError(errorMessage, HttpStatusCodes.INTERNAL_SERVER_ERROR)
    }

    protected removeFieldsNoPresentInModel(record: Record<string, any>): TUpdate {
        const filteredRecord: Record<string, any> = {}
        Object.keys(record).forEach((key) => {
            if (this.tableFields.some((field) => field.name === key)) {
                filteredRecord[key] = record[key]
            }
        })
        return filteredRecord as TUpdate
    }

    // eslint-disable-next-line no-unused-vars
    async executeWithTransaction<T>(fn: (transaction: Knex.Transaction) => Promise<T>) {
        const pool: Knex = await this.connection.getConnection(this.connectionName)
        const transaction = await pool.transaction()
        try {
            const result = await fn(transaction)
            await transaction.commit()
            return result
        } catch (error: any) {
            await transaction.rollback()
            throw this.errorHandler(error)
        }
    }

    // Utilized by those who inherit

    /**
     * Obtiene una cadena de campos para la consulta.
     * @returns {string[]} Arreglo con los nombres de los campos.
     */
    public getFieldsString() {
        return this.tableFields.map((field) => (field.alias ? `${field.name} as ${field.alias}` : field.name))
    }

    /**
     * Obtiene una lista de campos para la consulta.
     * @returns {string | Raw[]} Arreglo con los nombres o raw de knex de los campos a obtener.
     */
    public getFieldsSelectQuery(pool: Knex) {
        return this.tableFields.map((field) => {
            if (field.rawSelect) return pool.raw(field.rawSelect)
            return field.alias ? `${field.name} as ${field.alias}` : field.name
        })
    }

    /**
     * Obtiene el esquema basado en el cliente de conexión.
     * @param {string} connectionName - Nombre de la conexión.
     * @returns {string} Nombre del esquema.
     */
    public getSchema(connectionName: string) {
        return this.connection.getClient(connectionName) == 'msslq' ? 'dbo' : 'public'
    }

    /**
     * Interpreta y devuelve un mensaje de error de SQL basado en el cliente.
     * @param {Record<string, any>} error - Error SQL.
     * @param {string} client - Cliente de base de datos.
     * @returns {string} Mensaje de error interpretado.
     */
    public getSQLError(error: Record<string, any>, client: string): string {
        if (client === 'mssql') {
            if (error.number === 2627) return 'Cannot insert duplicate key in table'
            if (error.number === 547)
                return 'Cannot delete, create or update the record because other records are related to it with a foreign key constraint'
            if (error.number === 207) return 'Invalid column name'
            if (error.number === 208) return 'The object does not exist in the current database or in the specified database. ' + error.message
            return error.message
        }
        return 'Unknown database error'
    }

    protected builderJoin({ join, query, tableAlias, field, conditions, applyOnlyOnFrom = false }: BuilderJoinParams): Knex.QueryBuilder {
        const extraOnField: { field: string; value: any }[] = []
        join.extraOnField?.forEach((extraField) => {
            const condition = conditions?.find((e) => {
                const [alias, fieldName] = e.field.split('.')
                return fieldName ? fieldName === extraField : alias === extraField
            })
            if (condition) {
                extraOnField.push({ field: condition.field, value: condition.value })
            }
        })

        if (!applyOnlyOnFrom) {
            const fieldsJoin = join.select.map((row) => `${join.alias}.${row}`)
            query.select(fieldsJoin)
        }

        // const joinQuery = query.leftJoin(`${join.table} AS ${join.alias}`, `${join.alias}.${join.field}`, `${tableAlias}.${field.name}`)
        query.leftJoin(`${join.table} AS ${join.alias}`, function () {
            this.on(`${join.alias}.${join.field}`, '=', `${tableAlias}.${field.name}`)
            if (extraOnField.length > 0) {
                extraOnField.forEach((extraField) => {
                    const [alias, fieldName] = extraField.field.split('.')
                    const fieldNameExtra = fieldName ? fieldName : alias
                    this.andOn(`${join.alias}.${fieldNameExtra}`, extraField.value)
                })
            }
        })

        return query
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    protected customFilterRLS(_filteredUserRecords: Record<string, any>[], _query: Knex.QueryBuilder, _options?: any) {}

    private isAllowToFilterRLS(noFilterRLS?: boolean) {
        if (!this.noFilterRLSAllowed) return true
        return !noFilterRLS
    }
}
