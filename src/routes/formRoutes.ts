import express from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { submitForm, getForms } from "../controllers/formController";

const router = express.Router();

router.post("/", authenticateUser, async (req, res, next) => {
  try {
    await submitForm(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/", authenticateUser, async (req, res, next) => {
  try {
    await getForms(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
