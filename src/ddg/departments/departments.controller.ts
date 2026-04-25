import Controller from '../../system/controller'
import { IDepartments, IDepartmentsNew, IDepartmentsUpdate } from './departments.interface'
import { DepartmentsModel } from './departments.model'

export class DepartmentsController extends Controller<IDepartments, IDepartmentsNew, IDepartmentsUpdate> {
    constructor() {
        super()
        this.model = new DepartmentsModel()
    }
}
