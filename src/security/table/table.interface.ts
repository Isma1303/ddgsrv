export interface ITable {
    table_id: number
    table_name: string
    field_id: string
    schema_name: string
    assignable_rls: boolean
}

export interface ITableNew extends Omit<ITable, 'table_id'> {}
export interface ITableUpdate extends Partial<ITableNew> {}
