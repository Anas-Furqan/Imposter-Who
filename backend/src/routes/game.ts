import { Router } from "express";
import { saveGame } from "../controllers/gameController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/save", requireAuth, saveGame);

export default router;
