import Model from '../../system/model'
import { IProductCategories, IProductCategoriesNew, IProductCategoriesUpdate } from './product_categories.interface'

export class ProductCategoriesModel extends Model<IProductCategories, IProductCategoriesNew, IProductCategoriesUpdate> {
    constructor() {
        super()
        this.schemaName = 'coffee'
        this.tableName = 'product_categories'
        this.tableId = 'product_category_id'
        this.tableAlias = 'pc'
        this.tableFields = [
            { name: 'product_category_id', description: 'ID de la categoría de producto', required: false },
            { name: 'product_category_nm', description: 'Nombre de la categoría', required: true },
            { name: 'sort_order', description: 'Orden de clasificación', required: true },
            { name: 'is_active', description: 'Indica si está activa', required: true },
        ]
    }
}
