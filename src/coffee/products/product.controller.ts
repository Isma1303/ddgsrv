import Controller from '../../system/controller'
import { IProduct, IProductNew, IProductUpdate } from './product.interface'
import { ProductModel } from './product.model'

export class ProductController extends Controller<IProduct, IProductNew, IProductUpdate> {
    constructor() {
        super()
        this.model = new ProductModel()
    }
}
