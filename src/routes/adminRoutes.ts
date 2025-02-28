import express from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { getAllUsers, updateUserRole, deleteUser } from "../controllers/adminController";

const router = express.Router();

router.get("/users", authenticateUser, async (req, res, next) => {
  try {
    await getAllUsers(req, res);
  } catch (error) {
    next(error);
  }
});

router.put("/users/role", authenticateUser, async (req, res, next) => {
  try {
    await updateUserRole(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete("/users", authenticateUser, async (req, res, next) => {
  try {
    await deleteUser(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
