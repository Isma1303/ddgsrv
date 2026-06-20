import { Router } from "express";
import { MenuItemController } from "./menu_items.controller";

const router = Router();
const controller = new MenuItemController();

router.get("/", async (req, res) => {
  const response = await controller.getAll();
  res.status(response.status).json(response);
});

router.get("/:id", async (req, res) => {
  const response = await controller.getById(req);
  res.status(response.status).json(response);
});

router.post("/", async (req, res) => {
  const response = await controller.create(req);
  res.status(response.status).json(response);
});

router.put("/:id", async (req, res) => {
  const response = await controller.update(req);
  res.status(response.status).json(response);
});

router.delete("/:id", async (req, res) => {
  const response = await controller.delete(req);
  res.status(response.status).json(response);
});

export default router;
