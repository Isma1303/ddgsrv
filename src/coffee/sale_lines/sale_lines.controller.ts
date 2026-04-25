import Controller from '../../system/controller'
import { ISaleLines, ISaleLinesNew, ISaleLinesUpdate } from './sale_lines.interface'
import { SaleLinesModel } from './sale_lines.model'

export class SaleLinesController extends Controller<ISaleLines, ISaleLinesNew, ISaleLinesUpdate> {
    constructor() {
        super()
        this.model = new SaleLinesModel()
    }
}
