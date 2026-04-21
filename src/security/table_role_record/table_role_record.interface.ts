export interface ITableRoleRecord {
    record_id: number
    role_id: number
    table_id: number
    field: string
}

export interface ITableRoleRecordNew extends Omit<ITableRoleRecord, 'table_role_record_id'> {}
export interface ITableRoleRecordUpdate extends Partial<ITableRoleRecordNew> {}
