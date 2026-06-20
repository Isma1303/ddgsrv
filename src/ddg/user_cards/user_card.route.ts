import { Router } from "express";
import { UserCardController } from "./user_card.controller";

<<<<<<< Updated upstream
const router = Router();
const controller = new UserCardController();
=======
const router = Router()
const endPoint = '/ddg/user-cards'
const controller = new UserCardController()
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
router.get("/", async (req, res) => {
  const response = await controller.getAll();
  res.status(response.status).json(response);
});
=======
router.post('/scan-qr', async (req: Request, res: Response) => {
    const response = await controller.scanQr(req)
    return res.status(response.statusCode).json(response)
})

router.post('/register-attendance', async (req: Request, res: Response) => {
    const response = await controller.registerAttendance(req)
    return res.status(response.statusCode).json(response)
})

router.get('/search', async (req: Request, res: Response) => {
    const response = await controller.search(req)
    return res.status(response.statusCode).json(response)
})
>>>>>>> Stashed changes

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
