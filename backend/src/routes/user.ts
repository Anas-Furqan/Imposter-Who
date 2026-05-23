import { Router } from "express";
import { getLeaderboard, getProfile } from "../controllers/userController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/profile", requireAuth, getProfile);
router.get("/leaderboard", getLeaderboard);

export default router;
