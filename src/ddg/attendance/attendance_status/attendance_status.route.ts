import { Router } from "express";
import { AttendanceStatusController } from "./attendance_status.controller";

const router = Router();
const controller = new AttendanceStatusController();

router.get("/", async (req, res) => {
  const response = await controller.getAll(req);
  res.status(response.statusCode).json(response);
});

router.get("/:id", async (req, res) => {
  const response = await controller.getById(req);
  res.status(response.statusCode).json(response);
});

router.post("/", async (req, res) => {
  const response = await controller.add(req);
  res.status(response.statusCode).json(response);
});

router.put("/:id", async (req, res) => {
  const response = await controller.updateById(req);
  res.status(response.statusCode).json(response);
});

router.delete("/:id", async (req, res) => {
  const response = await controller.deleteById(req);
  res.status(response.statusCode).json(response);
});

export default router;
