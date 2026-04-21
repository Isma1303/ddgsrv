import { Router, Request, Response } from 'express'
import Route from '../../system/interfaces/route.interface'
import TableController from './table.controller'

const router = Router()
const endPoint = '/table'
const controller = new TableController()

router.get('/', async (req: Request, res: Response) => {
    const response = await controller.getAll(req)
    return res.status(response.statusCode).json(response)
})

router.post('/', async (req: Request, res: Response) => {
    const response = await controller.add(req)
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

router.get('/getAffectedRecordsByQuery', async (req: Request, res: Response) => {
    const response = await controller.getAffectedRecordsByQuery(req)
    return res.status(response.statusCode).json(response)
})

router.get('/:id', async (req: Request, res: Response) => {
    const response = await controller.getById(req)
    return res.status(response.statusCode).json(response)
})

router.delete('/:id', async (req: Request, res: Response) => {
    const response = await controller.deleteById(req)
    return res.status(response.statusCode).json(response)
})

router.put('/:id', async (req: Request, res: Response) => {
    const response = await controller.updateById(req)
    return res.status(response.statusCode).json(response)
})

const tableRouter: Route = { endPoint, router }

export default tableRouter
