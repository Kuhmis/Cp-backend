import express from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { createTemplate, getTemplates } from "../controllers/templateController";

const router = express.Router();

router.post("/", authenticateUser, createTemplate);
router.get("/", authenticateUser, getTemplates);

export default router;
