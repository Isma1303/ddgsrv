import { Router, Request, Response, NextFunction } from 'express'
import Ruta from '../../system/interfaces/route.interface'
import { getAuthorizationMiddleware, getAuthenticationMiddleware } from '../../system/utils/auth.utils'
import RolAccionController from './role_action.controller'

const router = Router()
const endPoint = '/role_action'
const controller = new RolAccionController()

router.all(
    '*',
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

router.get('/getActions/:role_id', async (req: Request, res: Response) => {
    const response = await controller.getActions(req)
    return res.status(response.statusCode).json(response)
})

router.get('/getRoles/:action_id', async (req: Request, res: Response) => {
    const response = await controller.getRoles(req)
    return res.status(response.statusCode).json(response)
})

const roleActionRouter: Ruta = { endPoint, router }

export default roleActionRouter
