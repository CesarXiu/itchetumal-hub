import { Router } from "express";
import AuthController from "@/controllers/authController";
import {authMiddleware} from "@/middleware/authMiddleware";

const router = Router();

router.post("/login", async (req, res) => {
    await AuthController.login(req, res);
});
router.post("/register", authMiddleware, async (req, res) => {
    await AuthController.register(req, res);
});

export default router;
