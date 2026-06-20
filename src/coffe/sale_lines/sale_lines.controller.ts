import { Controller } from "../../system/controller";
import {
  ISaleLine,
  ISaleLineNew,
  ISaleLineUpdate,
} from "./sale_lines.interface";
import { SaleLineModel } from "./sale_lines.model";

export class SaleLineController extends Controller<
  ISaleLine,
  ISaleLineNew,
  ISaleLineUpdate
> {
  constructor() {
    super(new SaleLineModel());
  }
}
