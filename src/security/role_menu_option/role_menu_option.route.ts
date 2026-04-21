import { Router, Request, Response, NextFunction } from 'express'
import Ruta from '../../system/interfaces/route.interface'
import { getAuthorizationMiddleware, getAuthenticationMiddleware } from '../../system/utils/auth.utils'
import RoleMenuOptionController from './role_menu_option.controller'

const router = Router()
const endPoint = '/role_menu_option'
const controller = new RoleMenuOptionController()

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

router.get('/getModelProperties', async (req: Request, res: Response) => {
    const response = controller.getModelProperties()
    return res.status(response.statusCode).json(response)
})

router.delete('/deleteByCondition/', async (req: Request, res: Response) => {
    const response = await controller.deleteByCondition(req)
    return res.status(response.statusCode).json(response)
})

router.delete('/deleteMenuOptions/:role_id', async (req: Request, res: Response) => {
    const response = await controller.deleteMenuOptions(req)
    return res.status(response.statusCode).json(response)
})

router.delete('/:firstId/:secondId', async (req: Request, res: Response) => {
    const response = await controller.deleteByCompositeKey(req)
    return res.status(response.statusCode).json(response)
})

router.get('/getMenuOptions/:role_id', async (req: Request, res: Response) => {
    const response = await controller.getMenuOptions(req)
    return res.status(response.statusCode).json(response)
})
router.get('/getAdminMenuOptions/:role_id', async (req: Request, res: Response) => {
    const response = await controller.getAdminMenuOptions(req)
    return res.status(response.statusCode).json(response)
})

router.get('/getRoles/:menu_option_id', async (req: Request, res: Response) => {
    const response = await controller.getRoles(req)
    return res.status(response.statusCode).json(response)
})

const roleMenuOptionRouter: Ruta = { endPoint, router }

export default roleMenuOptionRouter
