import { Router } from "express";
import PageController from "@/controllers/pageController";
import { authMiddleware } from "@/middleware/authMiddleware";
import pageFormatMiddleware from "@/middleware/pageFormatMiddleware";
const router = Router();

router.get("/", async (req, res) => {
  res.json(await PageController.index());
});
router.get("/:id", async (req, res) => {
  res.json(await PageController.show(req.params.id));
});
router.post("/", authMiddleware, pageFormatMiddleware, async (req, res) => {
  res.json(await PageController.store(req.body));
});
router.put("/:id", authMiddleware, pageFormatMiddleware, async (req, res) => {
  try{
    res.json(await PageController.update(req.body, req.params.id));
  }catch(e){
    res.json({error: "No se encontró el documento para actualizar."});
  }
});

export default router;