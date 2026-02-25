import Controller from '../../system/controller'
import ActionModel from './action.model'
import { IAction, IActionNew, IActionUpdate } from './action.interface'

export default class ActionController extends Controller<IAction, IActionNew, IActionUpdate> {
    model: ActionModel<IAction, IActionNew, IActionUpdate>

    constructor() {
        super()
        this.model = new ActionModel()
    }
}
