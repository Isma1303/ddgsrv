import { Model } from "../../system/model";
import { ISale, ISaleNew, ISaleUpdate } from "./sales.interface";

export class SaleModel extends Model<ISale, ISaleNew, ISaleUpdate> {
  constructor() {
    super();
    this.tableSchema = "coffe";
    this.tableName = "sales";
    this.tableKey = "sale_id";
    this.tableColumns = [
      {
        field: "sale_id",
        description: "ID de la venta",
        type: "number",
        required: false,
      },
      {
        field: "sold_at",
        description: "Fecha y hora de venta",
        type: "timestamp",
        required: true,
      },
      {
        field: "total_amount",
        description: "Monto total",
        type: "number",
        required: true,
      },
      {
        field: "notes",
        description: "Notas",
        type: "string",
        required: true,
      },
    ];
  }
}
