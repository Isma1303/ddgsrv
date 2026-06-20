import { Controller } from "../../system/controller";
import {
  IProductCategory,
  IProductCategoryNew,
  IProductCategoryUpdate,
} from "./product_categorie.interface";
import { ProductCategoryModel } from "./product_categorie.model";

export class ProductCategoryController extends Controller<
  IProductCategory,
  IProductCategoryNew,
  IProductCategoryUpdate
> {
  constructor() {
    super(new ProductCategoryModel());
  }
}
