import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();
const controller = new UserController();

router.get("/", async (req, res) => {
  const result = await controller.getAll();
  res.status(result.status).json(result);
});

router.get("/profile/:user_id", async (req, res) => {
  const result = await controller.profile(req);
  res.status(result.status).json(result);
});

router.get("/users-info", async (req, res) => {
  const result = await controller.getUSersInfo();
  res.status(result.status).json(result);
});

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

router.put("/:id", async (req, res) => {
  const result = await controller.update(req);
  res.status(result.status).json(result);
});

router.put("/change-password/:user_id", async (req, res) => {
  const result = await controller.updatePassword(req);
  res.status(result.status).json(result);
});

router.delete("/:id", async (req, res) => {
  const result = await controller.delete(req);
  res.status(result.status).json(result);
});

router.delete("/delete-user/:id", async (req, res) => {
  const result = await controller.deleteUser(req);
  res.status(result.status).json(result);
});

export default router;
