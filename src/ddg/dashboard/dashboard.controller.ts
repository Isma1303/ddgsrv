import { Controller } from "../../system/controller";
import { DashboardModel } from "./dashboard.model";

export class DashboardController  extends Controller<never, never, never>{
constructor(){
    super(new DashboardModel())
}

async getDashboradSummary(){
    try {
        const model = this.model as DashboardModel
        const response = model.getDashboardSummary()
        return {
            status: 200,
            response,
            message: 'Dashboard data'
        }
    } catch (error) {
        return{
            status: 400,
            message: 'Intenal Error'
        }
    }
}
}