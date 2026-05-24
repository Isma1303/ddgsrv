import Controller from "../../system/controller";
import { IProductCategories, IProductCategoriesNew, IProductCategoriesUpdate } from "./product_categories.interface";
import { ProductCategoriesModel } from "./product_categories.model";

export class ProductCategoriesController extends Controller<IProductCategories, IProductCategoriesNew, IProductCategoriesUpdate>{
    constructor(){
        super()
        this.model = new ProductCategoriesModel()
    }
}