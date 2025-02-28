import { Request, Response } from "express";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const updateUserRole = async (req: Request, res: Response) => {
  const { userId, role } = req.body;

  if (!userId || !role || !["USER", "ADMIN"].includes(role)) {
    return res.status(400).json({ error: "Invalid user ID or role" });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: role as Role },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user role" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    await prisma.user.delete({ where: { id: userId } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};
