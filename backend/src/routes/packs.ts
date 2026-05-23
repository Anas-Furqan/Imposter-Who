import { Router } from "express";
import {
  createCustomPack,
  deleteCustomPack,
  getCustomPacks,
  getPackWords,
  getPacks,
  updateCustomPack,
} from "../controllers/packsController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", getPacks);
router.get("/:id/words", requireAuth, getPackWords);
router.get("/custom", requireAuth, getCustomPacks);
router.post("/custom", requireAuth, createCustomPack);
router.put("/custom/:id", requireAuth, updateCustomPack);
router.delete("/custom/:id", requireAuth, deleteCustomPack);

export default router;
