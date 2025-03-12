import { Router } from "express";
import PageController from "@/controllers/pageController";
import { authMiddleware } from "@/middleware/authMiddleware";
const router = Router();

router.get("/", async (req, res) => {
  res.json(await PageController.index());
});
router.get("/:id", async (req, res) => {
  res.json(await PageController.show(req.params.id));
});
router.post("/", authMiddleware, async (req, res) => {
  res.json(await PageController.store(req.body));
});
router.put("/:id", authMiddleware, async (req, res) => {
  res.json(await PageController.update(req.body));
});

export default router;