import { Router } from "express";
import { EventsController } from "./events.controller";

const router = Router();
const controller = new EventsController();

router.get("/", async (req, res) => {
  const response = await controller.getAll(req);
  res.status(response.statusCode).json(response);
});

router.get("/:id", async (req, res) => {
  const response = await controller.getById(req);
  res.status(response.statusCode).json(response);
});

router.get("/user-events/:userId", async (req, res) => {
  const response = await controller.getEventsByUserId(req);
  res.status(response.status).json(response);
});

router.get("/users/:eventId", async (req, res) => {
  const response = await controller.getUsersByEvent(req);
  res.status(response.status).json(response);
});

router.post("/", async (req, res) => {
  const response = await controller.createNewEvent(req);
  res.status(response.status).json(response);
});

router.post("/assign-user/:eventId", async (req, res) => {
  const response = await controller.assignUserToEvent(req);
  res.status(response.status).json(response);
});

router.post("/attendance", async (req, res) => {
  const response = await controller.attendance(req);
  res.status(response.status).json(response);
});

router.put("/:id", async (req, res) => {
  const response = await controller.updateById(req);
  res.status(response.statusCode).json(response);
});

router.delete("/deleteUserFromEvent/:eventId/:userId", async (req, res) => {
  const response = await controller.deleteUserFromEvent(req);
  res.status(response.status).json(response);
});

router.delete("/:id", async (req, res) => {
  const response = await controller.deleteEvent(req);
  res.status(response.status).json(response);
});

export default router;
