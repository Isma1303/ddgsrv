import { Controller } from "../../system/controller";
import { IRole, IRoleNew, IRoleUpdate } from "./role.interface";
import { RoleModel } from "./role.model";


export class RoleController extends Controller<IRole, IRoleNew, IRoleUpdate> {
    constructor() {
        super(new RoleModel())
    }
}