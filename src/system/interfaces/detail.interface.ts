import Model from '../model'

export interface Detail {
    modelName: string
    tableField: string
    model: Model<any, any, any>
    ids?: number[]
}
