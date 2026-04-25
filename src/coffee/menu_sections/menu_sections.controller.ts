import Controller from '../../system/controller'
import { IMenuSection, IMenuSectionNew, IMenuSectionUpdate } from './menu_sections.interface'
import { MenuSectionsModel } from './menu_sections.model'

export class MenuSectionsController extends Controller<IMenuSection, IMenuSectionNew, IMenuSectionUpdate> {
    constructor() {
        super()
        this.model = new MenuSectionsModel()
    }
}
