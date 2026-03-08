import { Model } from "../../system/model";
import {
  IProductCategory,
  IProductCategoryNew,
  IProductCategoryUpdate,
} from "./product_categorie.interface";

export class ProductCategoryModel extends Model<
  IProductCategory,
  IProductCategoryNew,
  IProductCategoryUpdate
> {
  constructor() {
    super();
    this.tableSchema = "coffe";
    this.tableName = "product_categories";
    this.tableKey = "product_category_id";
    this.tableColumns = [
      {
        field: "product_category_id",
        description: "ID product category",
        type: "number",
        required: false,
      },
      {
        field: "product_category_nm",
        description: "Name product category",
        type: "string",
        required: true,
      },
      {
        field: "sort_order",
        description: "Sort order",
        type: "number",
        required: true,
      },
      {
        field: "is_active",
        description: "Is active",
        type: "boolean",
        required: true,
      },
    ];
  }
}
