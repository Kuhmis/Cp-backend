"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplates = exports.createTemplate = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description, topic, tags, isPublic, questions } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!title || !questions || questions.length === 0) {
        res.status(400).json({ error: "Title and at least one question are required." });
        return;
    }
    try {
        const template = yield prisma.template.create({
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
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create template." });
    }
});
exports.createTemplate = createTemplate;
const getTemplates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const templates = yield prisma.template.findMany({
            where: { isPublic: true },
            orderBy: { createdAt: "desc" },
        });
        res.json(templates);
    }
    catch (_a) {
        res.status(500).json({ error: "Failed to fetch templates." });
    }
});
exports.getTemplates = getTemplates;
