import { Controller } from "../../system/controller";
import { ISale, ISaleNew, ISaleUpdate } from "./sales.interface";
import { SaleModel } from "./sales.model";

export class SaleController extends Controller<ISale, ISaleNew, ISaleUpdate> {
  constructor() {
    super(new SaleModel());
  }
}
