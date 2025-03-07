import { Router } from "express";
import PageController from "@/controllers/pageController";
const router = Router();

router.get("/", async (req, res) => {
  res.json(await PageController.index());
});
router.get("/:id", async (req, res) => {
  res.json(await PageController.show(req.params.id));
});
router.post("/", async (req, res) => {
  res.json(await PageController.store(req.body));
});

export default router;