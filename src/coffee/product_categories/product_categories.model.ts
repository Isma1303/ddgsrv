import Model from '../../system/model'
import { IProductCategories, IProductCategoriesNew, IProductCategoriesUpdate } from './product_categories.interface'

export class ProductCategoriesModel extends Model<IProductCategories, IProductCategoriesNew, IProductCategoriesUpdate> {
    constructor() {
        super()
        this.schemaName = 'coffe'
        this.tableName = 'product_categories'
        this.tableId = 'product_category_id'
        this.tableAlias = 'pc'
        this.tableFields = [
            { name: 'product_category_id', description: 'ID de la categoría de producto', required: false },
            { name: 'product_category_nm', description: 'Nombre de la categoría', required: true },
        ]
    }
}
