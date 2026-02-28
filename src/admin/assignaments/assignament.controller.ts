import { Controller } from "../../system/controller";
import { AssignamentModel } from "./assignament.model";
import { Request } from "express";

export class AssignamentController extends Controller<never, never, never> {
    constructor() {
        super(new AssignamentModel())
    }

    async deleteAssignament(req: Request) {
        const model = new AssignamentModel()
        const { user_id, role_id } = req.body
        const response = await model.deleteAssignament(user_id, role_id)
        return {
            status: 200,
            message: 'Asignación eliminada correctamente',
            data: response
        }
    }


    async assign(req: Request) {
        const model = new AssignamentModel()
        try {
            const assignament: any = req.body
            const result = await model.assign(assignament)
            return {
                status: 200,
                message: 'Assignament assigned successfully',
                data: result
            }
        } catch (error: any) {
            return {
                status: 400,
                message: 'Event assignment failed',
                error: error.message
            }
        }
    }

    async getAssing(){
        try {
            const model = new AssignamentModel
            const data = await model.getAssignaments()
            return { 
                message: 'Assignaments fectch succesfully',
                status: 200,
                data: data
            }
        } catch (error) {
            return{ 
                message: 'Assignament fetch error',
                status: 400
            }
        }
    }
}