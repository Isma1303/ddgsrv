import Model from '../../system/model'
import { ISale, ISaleNew, ISaleUpdate } from './sales.interface'

export class SalesModel extends Model<ISale, ISaleNew, ISaleUpdate> {
    constructor() {
        super()
        this.schemaName = 'coffe'
        this.tableName = 'sales'
        this.tableId = 'sale_id'
        this.tableAlias = 's'
        this.tableFields = [
            {
                name: 'sale_id',
                description: 'ID de la venta',
                required: false,
            },
            {
                name: 'sold_at',
                description: 'Fecha de la venta',
                required: true,
            },
            {
                name: 'total_amount',
                description: 'Monto total',
                required: true,
            },
            {
                name: 'sale_status_id',
                description: 'Estado de la venta',
                required: true,
            },
            {
                name: 'notes',
                description: 'Notas de la venta',
                required: false,
            },
        ]
    }
}
