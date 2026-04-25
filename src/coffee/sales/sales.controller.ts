import Controller from '../../system/controller'
import { ISale, ISaleNew, ISaleUpdate } from './sales.interface'
import { SalesModel } from './sales.model'

export class SalesController extends Controller<ISale, ISaleNew, ISaleUpdate> {
    constructor() {
        super()
        this.model = new SalesModel()
    }
}
