import Controller from "../../system/controller";
import { DashboardModel } from "./dashboard.model";

export class DashboardController extends Controller<never, never, never> {
  model: DashboardModel;
  constructor() {
    super();
    this.model = new DashboardModel() as any;
  }

  async getDashboradSummary() {
    try {
      const response = await this.model.getDashboardSummary();
      return {
        status: 200,
        response,
        message: "Dashboard data",
      };
    } catch (error) {
      return {
        status: 400,
        message: "Intenal Error",
      };
    }
  }
}
