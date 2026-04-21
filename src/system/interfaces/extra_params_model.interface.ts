import { Knex } from 'knex'

interface IExtraParamsModel {
    transaction?: Knex.Transaction
}

export interface IBatchInsertOptions extends IExtraParamsModel {
    tableName?: string
    truncateTable?: boolean
}

export interface IAddOptions extends IExtraParamsModel {}

export interface IUpdateOptions extends IExtraParamsModel {}

export interface IDeleteOptions extends IExtraParamsModel {}

export interface IGetAllOptions extends IExtraParamsModel {}

export interface IGetByIdOptions extends IExtraParamsModel {}

export interface IExecSpOptions extends IExtraParamsModel {}

export interface ITruncateTableOptions extends IExtraParamsModel {
    tableName?: string
}
