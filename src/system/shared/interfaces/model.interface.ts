export interface ModelTableColumns {
    field: string
    description: string
    type: 'string' | 'number' | 'boolean' | 'date' | 'datetime' | 'timestamp' | 'time'
    required: boolean
    join?: {
        table: string
        tableSchema: string
        tableAlias?: string
        field: string
        type: 'inner' | 'left' | 'right' | 'full'
    }
}