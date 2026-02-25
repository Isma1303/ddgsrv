import { Request } from 'express'
import Controller from '../../system/controller'
import Response from '../../system/interfaces/response.interface'
import { getUserId } from '../../system/utils/auth.utils'
import MenuOptionModel from './menu_option.model'
import { HttpStatusCodes } from '../../system/interfaces/http_status_codes'
import { IMenuOption, IMenuOptionNew, IMenuOptionUpdate } from './menu_option.interface'

export default class MenuOptionController extends Controller<IMenuOption, IMenuOptionNew, IMenuOptionUpdate> {
    model: MenuOptionModel<IMenuOption, IMenuOptionNew, IMenuOptionUpdate>

    constructor() {
        super()
        this.model = new MenuOptionModel()

        // const data = readFileSync(
        //     './public/ea1694ce-b690-481e-ad2f-1da6f18eeeac/SemanticModel/e3ccc2c0-e473-431e-bf5c-fff5ea7f83d4/itemDefinition.json',
        //     'utf-8',
        // )

        // saveItemDefinitionBackUp('ea1694ce-b690-481e-ad2f-1da6f18eeeac', '02acde7d-c5aa-4946-8495-0c51aa29fee0', 'Report').then((res) => {
        //     console.log(res)
        // })
        // createItemFromDefinition('ea1694ce-b690-481e-ad2f-1da6f18eeeac', JSON.parse(data), 'NewSemanticModel', 'TEST', 'SemanticModel')

        // cloneWorkspace('ea1694ce-b690-481e-ad2f-1da6f18eeeac', 'WorkspaceCloneTest', 'WorkspaceCloneTest')

        // getSemanticModelRoles('ea1694ce-b690-481e-ad2f-1da6f18eeeac', '594c0012-ac79-4b24-b671-5bca05c899e7')
    }

    async getMenuOptions(req: Request): Promise<Response> {
        try {
            const userId = await getUserId(req)
            const menuOptions = await this.model.getMenuOptions(userId)
            return this.responseHandler({ data: menuOptions, message: 'Menu options retrieved successfully', statusCode: HttpStatusCodes.OK })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }

    async getNestedMenuOptions(req: Request): Promise<Response> {
        try {
            const userId = await getUserId(req)
            const nestedMenuOptions = await this.model.getNestedMenuOptions(userId)
            return this.responseHandler({
                data: nestedMenuOptions,
                message: 'Nested menu options retrieved successfully',
                statusCode: HttpStatusCodes.OK,
            })
        } catch (error: any) {
            return this.errorHandler(error)
        }
    }
}
