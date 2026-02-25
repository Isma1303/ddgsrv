import Controller from '../../system/controller'
import RoleModel from './role.model'
import { IRole, IRoleNew, IRoleUpdate } from './role.interface'

export default class RoleController extends Controller<IRole, IRoleNew, IRoleUpdate> {
    model: RoleModel

    constructor() {
        super()
        this.model = new RoleModel()
    }
}
