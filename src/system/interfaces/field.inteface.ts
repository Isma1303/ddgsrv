export interface IJoinField {
    table: string
    alias: string
    field: string
    select: string[]
    extraOnField?: string[]
}

export default interface Field {
    name: string
    description: string
    required: boolean
    alias?: string
    unique?: boolean
    dataType?: 'string' | 'number' | 'boolean' | 'date' | 'object' | 'datetime'
    maxLength?: number
    minLength?: number
    maxValue?: number
    minValue?: number
    regExp?: string
    validateFn?: any
    validationCriteria?: string
    expectedValue?: string
    sourceTable?: string
    join?: IJoinField | IJoinField[]
    rawSelect?: string
}
