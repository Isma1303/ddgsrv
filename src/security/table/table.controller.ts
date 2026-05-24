import Controller from '../../system/controller'
import { ITable, ITableNew, ITableUpdate } from './table.interface'
import TablaModel from './table.model'
export default class TablaController extends Controller<ITable, ITableNew, ITableUpdate> {
    model: TablaModel<ITable, ITableNew, ITableUpdate>
    constructor() {
        super()
        this.model = new TablaModel<ITable, ITableNew, ITableUpdate>()
    }
}
