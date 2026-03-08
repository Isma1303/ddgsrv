import { Model } from "../../system/model";
import {
  IMenuItem,
  IMenuItemNew,
  IMenuItemUpdate,
} from "./menu_items.interface";

export class MenuItemModel extends Model<
  IMenuItem,
  IMenuItemNew,
  IMenuItemUpdate
> {
  constructor() {
    super();
    this.tableSchema = "coffe";
    this.tableName = "menu_items";
    this.tableKey = "menu_item_id";
    this.tableColumns = [
      {
        field: "menu_item_id",
        description: "ID del item del menu",
        type: "number",
        required: false,
      },
      {
        field: "menu_section_id",
        description: "ID de la seccion del menu",
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
        field: "sort_order",
        description: "Orden para mostrar",
        type: "number",
        required: true,
      },
      {
        field: "price_override",
        description: "Precio manual del item",
        type: "number",
        required: true,
      },
      {
        field: "is_active",
        description: "Indica si el item esta activo",
        type: "boolean",
        required: true,
      },
    ];
  }
}
