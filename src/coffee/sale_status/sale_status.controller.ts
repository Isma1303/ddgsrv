import Controller from '../../system/controller'
import { ISaleStatus, ISaleStatusNew, ISaleStatusUpdate } from './sale_status.interface'
import { SaleStatusModel } from './sale_status.model'

export class SaleStatusController extends Controller<ISaleStatus, ISaleStatusNew, ISaleStatusUpdate> {
    constructor() {
        super()
        this.model = new SaleStatusModel()
    }
}
