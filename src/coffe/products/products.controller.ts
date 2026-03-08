import { Controller } from "../../system/controller";
import { IProduct, IProductNew, IProductUpdate } from "./products.interface";
import { ProductModel } from "./products.model";

export class ProductController extends Controller<IProduct, IProductNew, 
IProductUpdate>{
    constructor(){
        super(new ProductModel());

    }
}