import { Router, Request, Response, NextFunction } from 'express'
import Ruta from '../../system/interfaces/route.interface'
import { getAuthorizationMiddleware, getAuthenticationMiddleware } from '../../system/utils/auth.utils'
import RegistroTablaRolesController from './table_role_record.controller'

const router = Router()
const endPoint = '/table_role_record'
const controller = new RegistroTablaRolesController()

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

router.get('/getModelProperties', async (req: Request, res: Response) => {
    const response = controller.getModelProperties()
    return res.status(response.statusCode).json(response)
})

router.delete('/deleteByCondition/', async (req: Request, res: Response) => {
    const response = await controller.deleteByCondition(req)
    return res.status(response.statusCode).json(response)
})

router.delete('/deleteRoles/:registro_id', async (req: Request, res: Response) => {
    const response = await controller.deleteRoles(req)
    return res.status(response.statusCode).json(response)
})

router.delete('/deleteTableRecords/:role_id', async (req: Request, res: Response) => {
    const response = await controller.deleteTableRecords(req)
    return res.status(response.statusCode).json(response)
})

router.put('/updateTableRecords', async (req: Request, res: Response) => {
    const response = await controller.updateTableRecords(req)
    return res.status(response.statusCode).json(response)
})

router.delete('/:firstId/:secondId', async (req: Request, res: Response) => {
    const response = await controller.deleteByCompositeKey(req)
    return res.status(response.statusCode).json(response)
})

router.get('/getAssignedTableRecordsRLS/:role_id/:table_id', async (req: Request, res: Response) => {
    const response = await controller.getAssignedTableRecordsRLS(req)
    return res.status(response.statusCode).json(response)
})

const roleTableRecordRouter: Ruta = { endPoint, router }

export default roleTableRecordRouter
