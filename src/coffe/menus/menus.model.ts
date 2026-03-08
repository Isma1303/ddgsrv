import { Model } from "../../system/model";
import { IMenu, IMenuNew, IMenuUpdate } from "./menus.interface";

export class MenuModel extends Model<IMenu, IMenuNew, IMenuUpdate> {
  constructor() {
    super();
    this.tableSchema = "coffe";
    this.tableName = "menus";
    this.tableKey = "menu_id";
    this.tableColumns = [
      {
        field: "menu_id",
        description: "ID del menu",
        type: "number",
        required: false,
      },
      {
        field: "menu_nm",
        description: "Nombre del menu",
        type: "string",
        required: true,
      },
      {
        field: "valid_from",
        description: "Fecha desde la que aplica",
        type: "date",
        required: true,
      },
      {
        field: "valid_to",
        description: "Fecha hasta la que aplica",
        type: "date",
        required: true,
      },
      {
        field: "is_active",
        description: "Indica si el menu esta activo",
        type: "boolean",
        required: true,
      },
    ];
  }
}
