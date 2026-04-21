import { Router, Request, Response, NextFunction } from 'express'
import Ruta from '../../system/interfaces/route.interface'
import { getAuthorizationMiddleware, getAuthenticationMiddleware } from '../../system/utils/auth.utils'
import RolSystemActionController from './role_system_action.controller'

const router = Router()
const endPoint = '/role_system_action'
const controller = new RolSystemActionController()

router.use(
    getAuthenticationMiddleware,
    (req: Request, res: Response, next: NextFunction) => {
        res.locals['controller'] = controller
        next()
    },
    getAuthorizationMiddleware,
)

router.get('/', async (req: Request, res: Response) => {
    const response = await controller.getAll(req)
    return res.status(response.statusCode).json(response)
})

router.post('/', async (req: Request, res: Response) => {
    const response = await controller.add(req)
    return res.status(response.statusCode).json(response)
})

router.post('/batchInsert', async (req: Request, res: Response) => {
    const response = await controller.batchInsert(req)
    return res.status(response.statusCode).json(response)
})

router.post('/createSystemActionsAssignments', async (req: Request, res: Response) => {
    const response = await controller.createSystemActionsAssignments(req)
    return res.status(response.statusCode).json(response)
})

router.get('/search', async (req: Request, res: Response) => {
    const response = await controller.search(req)
    return res.status(response.statusCode).json(response)
})

router.get('/getTotalRecords', async (req: Request, res: Response) => {
    const response = await controller.getTotalRecords(req)
    return res.status(response.statusCode).json(response)
})

router.delete('/deleteByCondition', async (req: Request, res: Response) => {
    const response = await controller.deleteByCondition(req)
    return res.status(response.statusCode).json(response)
})

router.delete('/deleteActions/:role_id', async (req: Request, res: Response) => {
    const response = await controller.deleteActions(req)
    return res.status(response.statusCode).json(response)
})

router.delete('/:firstId/:secondId', async (req: Request, res: Response) => {
    const response = await controller.deleteByCompositeKey(req)
    return res.status(response.statusCode).json(response)
})

router.get('/getSystemActions/:role_id', async (req: Request, res: Response) => {
    const response = await controller.getSystemActions(req)
    return res.status(response.statusCode).json(response)
})

router.get('/getAssignedSystemActionsByUser/:user_id', async (req: Request, res: Response) => {
    const response = await controller.getAssignedSystemActionsByUser(req)
    return res.status(response.statusCode).json(response)
})

router.get('/getSystemActionsByName/:role_id', async (req: Request, res: Response) => {
    const response = await controller.getSystemActionsByName(req)
    return res.status(response.statusCode).json(response)
})

router.get('/getRoles/:system_action_id', async (req: Request, res: Response) => {
    const response = await controller.getRoles(req)
    return res.status(response.statusCode).json(response)
})

router.put('/multipleUpdate', async (req: Request, res: Response) => {
    const response = await controller.multipleUpdate(req)
    return res.status(response.statusCode).json(response)
})

const roleSystemActionRouter: Ruta = { endPoint, router }

export default roleSystemActionRouter
