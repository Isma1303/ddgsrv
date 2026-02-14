import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();
const controller = new UserController();

router.post("/register", async (req, res) => {
    const result = await controller.register(req);
    res.status(result.status).json(result);
});

router.post("/login", async (req, res) => {
    const result = await controller.login(req, res);
    res.status(result.status).json(result);
});

router.post("/logout", async (req, res) => {
    const result = await controller.logout(req, res);
    res.status(result.status).json(result);
});

router.put("/update-password", async (req, res) => {
    const result = await controller.updatePassword(req);
    res.status(result.status).json(result);
});

export default router;
