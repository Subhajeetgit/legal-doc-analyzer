import express from "express";
import protect from "../middleware/authMiddleware.js";
import { exportAnalysisPDF } from "../controllers/exportController.js";

const router = express.Router();

router.get("/:id/export-pdf", protect, exportAnalysisPDF);

export default router;
