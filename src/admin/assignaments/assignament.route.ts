import { Router } from "express";
import { AssignamentController } from "./assignament.controller";

const router = Router();
const controller = new AssignamentController();

router.get('/', async (req, res) => {
    const response = await controller.getAll()
    res.status(response.status).json(response)
})

router.get('/assign', async(req, res)=>{
    const response = await controller.getAssing()
    res.status(response.status).json(response)
})

router.get('/:id', async (req, res) => {
    const response = await controller.getById(req)
    res.status(response.status).json(response)
})


router.post('/', async (req, res) => {
    const response = await controller.create(req)
    res.status(response.status).json(response)
})

router.post('/assign', async (req, res) => {
    const response = await controller.assign(req)
    res.status(response.status).json(response)
})


router.put('/:id', async (req, res) => {
    const response = await controller.update(req)
    res.status(response.status).json(response)

})

router.delete('/', async (req, res) => {
    const response = await controller.deleteAssignament(req)
    res.status(response.status).json(response)
})

router.delete('/:id', async (req, res) => {
    const response = await controller.delete(req)
    res.status(response.status).json(response)
})

export default router;
