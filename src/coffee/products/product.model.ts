import Model from '../../system/model'
import { IProduct, IProductNew, IProductUpdate } from './product.interface'

export class ProductModel extends Model<IProduct, IProductNew, IProductUpdate> {
    constructor() {
        super()
        this.schemaName = 'coffe'
        this.tableName = 'products'
        this.tableId = 'product_id'
        this.tableAlias = 'p'
        this.tableFields = [
            { name: 'product_id', description: 'ID del producto', required: false },
            { name: 'product_category_id', description: 'ID de la categoría del producto', required: true },
            { name: 'product_nm', description: 'Nombre del producto', required: true },
            { name: 'product_description', description: 'Descripción del producto', required: true },
            { name: 'product_price', description: 'Precio del producto', required: true },
            { name: 'stock', description: 'Stock del producto', required: true },
            { name: 'is_active', description: 'Indica si está activo', required: true },
            { name: 'product_img', description: 'Imagen del producto', required: false },
            { name: 'public_id', description: 'Public ID de la imagen en Cloudinary', required: false },
        ]
    }
}
