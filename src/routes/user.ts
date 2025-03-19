import { Router } from "express";
import UserController from "@/controllers/userController";
const router = Router();

router.get("/", async (req, res) => {
  res.json(await UserController.index());
});
router.get("/:id", async (req, res) => {
  res.json(await UserController.show(req.params.id));
});
router.post("/", async (req, res) => {
  res.json(await UserController.store(req.body));
});
router.put("/:id", async (req, res) => {
  res.json(await UserController.update(req.body));
});

export default router;