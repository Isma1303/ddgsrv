import { Router, Request, Response, NextFunction } from 'express'
import Ruta from '../../system/interfaces/route.interface'
import { getAuthenticationMiddleware, getAuthorizationMiddleware } from '../../system/utils/auth.utils'
import { authLimiter } from '../../system/lib/rate-limit.config'
import userController from './user.controller'

const router = Router()
// router.use(limiter)
const endPoint = '/user'
const controller = new userController()

router.post('/authenticate', authLimiter, async (req: Request, res: Response) => {
    const response = await controller.authenticate(req)
    return res.status(response.statusCode).json(response)
})

// router.post('/changePassword', async (req: Request, res: Response) => {
//     const response = await controller.changePassword(req)
//     return res.status(response.statusCode).json(response)
// })

// router.post('/authToken', async (req: Request, res: Response) => {
//     const response = await controller.authToken(req)
//     return res.status(response.statusCode).json(response)
// })

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

router.get('/getAuthenticatedUser', async (req: Request, res: Response) => {
    const response = await controller.getAuthenticatedUser(req)
    return res.status(response.statusCode).json(response)
})

router.get('/getUserInfo', async (req: Request, res: Response) => {
    const response = await controller.getUserInfo(req)
    return res.status(response.statusCode).json(response)
})

router.get('/getAppVersion', async (req: Request, res: Response) => {
    const response = await controller.getAppVersion()
    return res.status(response.statusCode).json(response)
})

router.get('/validateActualPassword/:passwordActual', async (req: Request, res: Response) => {
    const response = await controller.validateActualPassword(req)
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

const userRouter: Ruta = { endPoint, router }

export default userRouter
