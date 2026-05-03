import Controller from '../../system/controller'
import { ISaleDetail, ISaleDetailNew, ISaleDetailUpdate } from './sale_detail.interface'
import { SaleDetailModel } from './sale_detail.model'

export class SaleDetailController extends Controller<ISaleDetail, ISaleDetailNew, ISaleDetailUpdate> {
    constructor() {
        super()
        this.model = new SaleDetailModel()
    }
}
