import Controller from "../../system/controller";
import IResponse from "../../system/interfaces/response.interface";
import { getUserId } from "../../system/utils/auth.utils";
import { ISale, ISaleNew, ISaleUpdate } from "./sales.interface";
import { SalesModel } from "./sales.model";

export class SalesController extends Controller<ISale, ISaleNew, ISaleUpdate> {
  model: SalesModel;

  constructor() {
    super();
    this.model = new SalesModel();
  }
}
