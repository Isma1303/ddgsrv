import { Model } from "../../system/model";
import {
  IMenuSection,
  IMenuSectionNew,
  IMenuSectionUpdate,
} from "./menu_sections.interface";

export class MenuSectionModel extends Model<
  IMenuSection,
  IMenuSectionNew,
  IMenuSectionUpdate
> {
  constructor() {
    super();
    this.tableSchema = "coffe";
    this.tableName = "menu_sections";
    this.tableKey = "menu_section_id";
    this.tableColumns = [
      {
        field: "menu_section_id",
        description: "ID de la seccion",
        type: "number",
        required: false,
      },
      {
        field: "menu_id",
        description: "ID del menu",
        type: "number",
        required: true,
      },
      {
        field: "section_nm",
        description: "Nombre de la seccion",
        type: "string",
        required: true,
      },
      {
        field: "sort_order",
        description: "Orden para mostrar",
        type: "number",
        required: true,
      },
      {
        field: "is_active",
        description: "Indica si la seccion esta activa",
        type: "boolean",
        required: true,
      },
    ];
  }
}
