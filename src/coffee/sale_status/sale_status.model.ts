import Model from '../../system/model'
import { ISaleStatus, ISaleStatusNew, ISaleStatusUpdate } from './sale_status.interface'

export class SaleStatusModel extends Model<ISaleStatus, ISaleStatusNew, ISaleStatusUpdate> {
    constructor() {
        super()
        this.schemaName = 'coffe'
        this.tableName = 'sales_status'
        this.tableId = 'sale_status_id'
        this.tableAlias = 'ss'
        this.tableFields = [
            {
                name: 'sale_status_id',
                description: 'ID del estado de la venta',
                required: false,
            },
            {
                name: 'sale_status_nm',
                description: 'Nombre del estado de la venta',
                required: true,
            },
        ]
    }
}
