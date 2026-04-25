import Controller from '../../system/controller'
import { IDepartmentMember, IDepartmentMemberNew, IDepartmentMemberUpdate } from './department_members.interface'
import { DepartmentMembersModel } from './department_members.model'

export class DepartmentMembersController extends Controller<IDepartmentMember, IDepartmentMemberNew, IDepartmentMemberUpdate> {
    constructor() {
        super()
        this.model = new DepartmentMembersModel()
    }
}
