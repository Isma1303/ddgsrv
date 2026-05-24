import Model from "../../system/model";
import {
  ISaleDetail,
  ISaleDetailNew,
  ISaleDetailUpdate,
} from "./sale_detail.interface";

export class SaleDetailModel extends Model<
  ISaleDetail,
  ISaleDetailNew,
  ISaleDetailUpdate
> {
  constructor() {
    super();
    this.schemaName = "coffe";
    this.tableName = "sale_details";
    this.tableId = "sale_detail_id";
    this.tableAlias = "sd";
    this.tableFields = [
      {
        name: "sale_detail_id",
        description: "ID del detalle de la venta",
        required: false,
      },
      {
        name: "sale_id",
        description: "ID de la venta",
        required: true,
      },
      {
        name: "product_id",
        description: "ID del producto",
        required: true,
      },
      {
        name: "quantity",
        description: "Cantidad",
        required: true,
      },
      {
        name: "line_total",
        description: "Total de la línea",
        required: true,
      },
    ];
  }
}
