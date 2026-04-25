import Controller from '../../system/controller'
import { IUserDepartment, IUserDepartmentNew, IUserDepartmentUpdate } from './user_departments.interface'
import { UserDepartmentsModel } from './user_departments.model'

export class UserDepartmentsController extends Controller<IUserDepartment, IUserDepartmentNew, IUserDepartmentUpdate> {
    constructor() {
        super()
        this.model = new UserDepartmentsModel()
    }
}
