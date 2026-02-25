import Controller from '../../system/controller'
import SystemActionModel from './system_action.model'
import { ISystemAction, ISystemActionNew, ISystemActionUpdate } from './system_action.interface'

export default class SystemActionController extends Controller<ISystemAction, ISystemActionNew, ISystemActionUpdate> {
    model: SystemActionModel
    constructor() {
        super()
        this.model = new SystemActionModel()
    }
}
