import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const submitForm = async (req: Request, res: Response) => {
  const { templateId, responses } = req.body;
  const userId = (req as any).user?.userId; // Extracted from JWT

  if (!templateId || !responses) {
    return res.status(400).json({ error: "Missing templateId or responses" });
  }

  try {
    const form = await prisma.form.create({
      data: { templateId, userId, responses },
    });

    res.json(form);
  } catch (error) {
    res.status(500).json({ error: "Error submitting form" });
  }
};

export const getForms = async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;

  try {
    const forms = await prisma.form.findMany({ where: { userId } });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving forms" });
  }
};
