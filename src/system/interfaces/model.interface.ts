/* eslint-disable no-unused-vars */
import { Knex } from 'knex'
import Condition from './condition.interface'
import Field, { IJoinField } from './field.inteface'

export interface GetAllParams {
    sort?: string
    directionSort?: 'asc' | 'desc'
    offset?: number
    limit?: number
    userId?: number
    noFilterRLS?: boolean
    customFilterRLSExternal?: (_filteredUserRecords: Record<string, any>[], _query: Knex.QueryBuilder, _options?: Record<string, any>) => void
}

export interface GetByIdOptions {
    noFilterRLS?: boolean
    customFilterRLSExternal?: (_filteredUserRecords: Record<string, any>[], _query: Knex.QueryBuilder, _options?: Record<string, any>) => void
}

export interface GetTotalRecordsOptions {
    noFilterRLS?: boolean
    customFilterRLSExternal?: (_filteredUserRecords: Record<string, any>[], _query: Knex.QueryBuilder, _options?: Record<string, any>) => void
}

export interface GetAffectedRecordsByQueryOptions {
    noFilterRLS?: boolean
    customFilterRLSExternal?: (_filteredUserRecords: Record<string, any>[], _query: Knex.QueryBuilder, _options?: Record<string, any>) => void
}

export interface SearchParams extends GetAllParams {
    conditions: Condition[]
    extraFieldsModelToGet?: string[]
}

export interface UpdateByIdParams<T> {
    id: number
    record: T
    userId: number
}

export interface MultipleUpdateParams<T> {
    record: T
    conditions: Condition[]
    userId: number
}

export interface LoadDataParams<T> {
    records: T[]
    truncateTable?: boolean
    formatRecord?: Record<string, string>
}

export interface ModelProperties {
    tableName: string
    tableId: string
    fieldNames: string[]
    tableFields: Field[]
}

export interface DeletedResponse {
    deletedId: number
}

export interface UpdatedResponse {
    updatedId: number
}

export interface ValidationError {
    invalidCriteria: string
    expectedValue: string
}

export interface InvalidField {
    field: string
    validations: ValidationError[]
}

export interface AffectedRecordsByQueryResponse {
    affectedRecords: number
}

export interface LoadDataResponse {
    recordCount: number
}

export type OperationType = 'select' | 'multipleUpdate' | 'del' | 'count' | 'sum'

export interface ExecSpParams {
    spName: string
    params: Record<string, any> | null | undefined
}

export interface BuilderJoinParams {
    join: IJoinField
    query: Knex.QueryBuilder
    tableAlias: string
    field: Field
    conditions?: Condition[]
    applyOnlyOnFrom?: boolean
}
