import { Router, Request, Response, NextFunction } from 'express'
import Ruta from '../../system/interfaces/route.interface'
import { getAuthorizationMiddleware, getAuthenticationMiddleware } from '../../system/utils/auth.utils'
import userRolController from './user_role.controller'

const router = Router()
const endPoint = '/user_role'
const controller = new userRolController()

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

router.get('/search', async (req: Request, res: Response) => {
    const response = await controller.search(req)
    return res.status(response.statusCode).json(response)
})

router.get('/getTotalRecords', async (req: Request, res: Response) => {
    const response = await controller.getTotalRecords(req)
    return res.status(response.statusCode).json(response)
})

router.delete('/deleteRoles/:user_id', async (req: Request, res: Response) => {
    const response = await controller.deleteRoles(req)
    return res.status(response.statusCode).json(response)
})

router.delete('/deleteUsers/:role_id', async (req: Request, res: Response) => {
    const response = await controller.deleteUsers(req)
    return res.status(response.statusCode).json(response)
})

router.delete('/deleteByCondition/', async (req: Request, res: Response) => {
    const response = await controller.deleteByCondition(req)
    return res.status(response.statusCode).json(response)
})

router.delete('/:firstId/:secondId', async (req: Request, res: Response) => {
    const response = await controller.deleteByCompositeKey(req)
    return res.status(response.statusCode).json(response)
})

router.get('/getRoles/:user_id', async (req: Request, res: Response) => {
    const response = await controller.getRoles(req)
    return res.status(response.statusCode).json(response)
})

router.get('/getAssignedRoles/:user_id', async (req: Request, res: Response) => {
    const response = await controller.getAssignedRoles(req)
    return res.status(response.statusCode).json(response)
})

router.get('/getUsers/:role_id', async (req: Request, res: Response) => {
    const response = await controller.getUsers(req)
    return res.status(response.statusCode).json(response)
})

const userRoleRouter: Ruta = { endPoint, router }

export default userRoleRouter
