import { Controller } from "../../system/controller";
import { IMenu, IMenuNew, IMenuUpdate } from "./menus.interface";
import { MenuModel } from "./menus.model";

export class MenuController extends Controller<IMenu, IMenuNew, IMenuUpdate> {
  constructor() {
    super(new MenuModel());
  }
}
