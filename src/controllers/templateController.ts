import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTemplate = async (req: Request, res: Response): Promise<void> => {
  const { title, description, topic, tags, isPublic, questions } = req.body;
  const userId = (req as any).user?.userId;

  if (!title || !questions || questions.length === 0) {
    res.status(400).json({ error: "Title and at least one question are required." });
    return;
  }

  try {
    const template = await prisma.template.create({
      data: {
        title,
        description,
        topic,
        tags,
        isPublic,
        userId,
        questions, // store as JSON
      },
    });

    res.json(template);
  } catch (error) {
    res.status(500).json({ error: "Failed to create template." });
  }
};

export const getTemplates = async (req: Request, res: Response): Promise<void> => {
  try {
    const templates = await prisma.template.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(templates);
  } catch {
    res.status(500).json({ error: "Failed to fetch templates." });
  }
};
