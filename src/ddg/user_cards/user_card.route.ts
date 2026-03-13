import { Router } from "express";
import { UserCardController } from "./user_card.controller";

const router = Router();
const controller = new UserCardController();

router.post("/scan", async (req, res) => {
  const response = await controller.scanQr(req);
  res.status(response.status).json(response);
});

router.post("/attendance", async (req, res) => {
  const response = await controller.registerAttendance(req);
  res.status(response.status).json(response);
});

router.get("/user/:user_id", async (req, res) => {
  const response = await controller.getCardByUserId(req);
  res.status(response.status).json(response);
});

router.get("/", async (req, res) => {
  const response = await controller.getAll();
  res.status(response.status).json(response);
});

router.get("/:id", async (req, res) => {
  const response = await controller.getById(req);
  res.status(response.status).json(response);
});

router.post("/", async (req, res) => {
  const response = await controller.createCard(req);
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
