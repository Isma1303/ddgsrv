import { Router, Request, Response, NextFunction } from 'express'
import Route from '../../system/interfaces/route.interface'
import { getAuthorizationMiddleware, getAuthenticationMiddleware } from '../../system/utils/auth.utils'
import { ProductController } from './product.controller'
import { imageUploadConfig } from '../../system/utils/multer.util'

const router = Router()
const endPoint = '/coffe/products'
const controller = new ProductController()

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

router.post('/createProduct', imageUploadConfig, async (req: Request, res: Response) => {
    const response = await controller.createProduct(req)
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

router.get('/getModelProperties', async (req: Request, res: Response) => {
    const response = controller.getModelProperties()
    return res.status(response.statusCode).json(response)
})

router.get('/getAffectedRecordsByQuery', async (req: Request, res: Response) => {
    const response = await controller.getAffectedRecordsByQuery(req)
    return res.status(response.statusCode).json(response)
})

router.get('/getTotalRecords', async (req: Request, res: Response) => {
    const response = await controller.getTotalRecords(req)
    return res.status(response.statusCode).json(response)
})

router.get('/:id', async (req: Request, res: Response) => {
    const response = await controller.getById(req)
    return res.status(response.statusCode).json(response)
})

router.delete('/:id', async (req: Request, res: Response) => {
    const response = await controller.deleteProduct(req)
    return res.status(response.statusCode).json(response)
})

router.put('/:id', imageUploadConfig, async (req: Request, res: Response) => {
    const response = await controller.updateProduct(req)
    return res.status(response.statusCode).json(response)
})

const productRouter: Route = { endPoint, router }

export default productRouter
