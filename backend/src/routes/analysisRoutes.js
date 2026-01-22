import express from "express";
import protect from "../middleware/authMiddleware.js";
import { analyzeDocument } from "../controllers/analysisController.js";

const router = express.Router();

router.post("/:id/analyze", protect, analyzeDocument);

export default router;
