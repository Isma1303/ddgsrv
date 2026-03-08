import { Controller } from "../../system/controller";
import {
  IMenuItem,
  IMenuItemNew,
  IMenuItemUpdate,
} from "./menu_items.interface";
import { MenuItemModel } from "./menu_items.model";

export class MenuItemController extends Controller<
  IMenuItem,
  IMenuItemNew,
  IMenuItemUpdate
> {
  constructor() {
    super(new MenuItemModel());
  }
}
