import { Router } from "express";
import { DashboardController } from "./dashboard.controller";

const router = Router();
const controller = new DashboardController();

router.get('/', async (req, res) => {
    const response = await controller.getDashboradSummary()
    res.status(response.status).json(response)
})

export default router;
