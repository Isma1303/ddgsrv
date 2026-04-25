import Model from '../../system/model'
import { ISaleLines, ISaleLinesNew, ISaleLinesUpdate } from './sale_lines.interface'

export class SaleLinesModel extends Model<ISaleLines, ISaleLinesNew, ISaleLinesUpdate> {
    constructor() {
        super()
        this.schemaName = 'coffee'
        this.tableName = 'sale_lines'
        this.tableId = 'sale_line_id'
        this.tableAlias = 'sl'
        this.tableFields = [
            { name: 'sale_line_id', description: 'ID de la línea de venta', required: false },
            { name: 'sale_id', description: 'ID de la venta', required: true },
            { name: 'menu_item_id', description: 'ID del artículo del menú', required: true },
            { name: 'product_id', description: 'ID del producto', required: true },
            { name: 'quantity', description: 'Cantidad', required: true },
            { name: 'unit_price', description: 'Precio unitario', required: true },
            { name: 'line_total', description: 'Total de la línea', required: true },
        ]
    }
}
