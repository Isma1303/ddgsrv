import { Model } from "../../system/model";
import {
  ISaleLine,
  ISaleLineNew,
  ISaleLineUpdate,
} from "./sale_lines.interface";

export class SaleLineModel extends Model<
  ISaleLine,
  ISaleLineNew,
  ISaleLineUpdate
> {
  constructor() {
    super();
    this.tableSchema = "coffe";
    this.tableName = "sale_lines";
    this.tableKey = "sale_line_id";
    this.tableColumns = [
      {
        field: "sale_line_id",
        description: "ID de la linea de venta",
        type: "number",
        required: false,
      },
      {
        field: "sale_id",
        description: "ID de la venta",
        type: "number",
        required: true,
      },
      {
        field: "product_id",
        description: "ID del producto",
        type: "number",
        required: true,
      },
      {
        field: "menu_item_id",
        description: "ID del item del menu",
        type: "number",
        required: true,
      },
      {
        field: "quantity",
        description: "Cantidad",
        type: "number",
        required: true,
      },
      {
        field: "unit_price",
        description: "Precio unitario",
        type: "number",
        required: true,
      },
      {
        field: "line_total",
        description: "Monto total de la linea",
        type: "number",
        required: true,
      },
    ];
  }
}
