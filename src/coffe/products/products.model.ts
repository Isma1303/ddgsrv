import { Model } from "../../system/model";
import { IProduct, IProductNew, IProductUpdate } from "./products.interface";

export class ProductModel extends Model<IProduct, IProductNew, IProductUpdate> {
  constructor() {
    super();
    this.tableSchema = "coffe";
    this.tableName = "products";
    this.tableKey = "product_id";
    this.tableColumns = [
      {
        field: "product_id",
        description: "ID del producto",
        type: "number",
        required: false,
      },
      {
        field: "product_category_id",
        description: "ID de la categoría del producto",
        type: "number",
        required: true,
      },
      {
        field: "product_nm",
        description: "Nombre del producto",
        type: "string",
        required: true,
      },
      {
        field: "product_description",
        description: "Descripción del producto",
        type: "string",
        required: true,
      },
      {
        field: "product_price",
        description: "Precio del producto",
        type: "number",
        required: true,
      },
      {
        field: "stock",
        description: "Cantidad en stock del producto",
        type: "number",
        required: true,
      },
      {
        field: "product_img",
        description: "URL de la imagen del producto",
        type: "string",
        required: false,
      },
      {
        field: "is_active",
        description: "Indica si el producto está activo",
        type: "boolean",
        required: true,
      },
    ];
  }
}
