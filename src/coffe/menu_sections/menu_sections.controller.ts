import { Controller } from "../../system/controller";
import {
  IMenuSection,
  IMenuSectionNew,
  IMenuSectionUpdate,
} from "./menu_sections.interface";
import { MenuSectionModel } from "./menu_sections.model";

export class MenuSectionController extends Controller<
  IMenuSection,
  IMenuSectionNew,
  IMenuSectionUpdate
> {
  constructor() {
    super(new MenuSectionModel());
  }
}
