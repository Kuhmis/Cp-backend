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
exports.getForms = exports.submitForm = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const submitForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { templateId, responses } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId; // Extracted from JWT
    if (!templateId || !responses) {
        return res.status(400).json({ error: "Missing templateId or responses" });
    }
    try {
        const form = yield prisma.form.create({
            data: { templateId, userId, responses },
        });
        res.json(form);
    }
    catch (error) {
        res.status(500).json({ error: "Error submitting form" });
    }
});
exports.submitForm = submitForm;
const getForms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const forms = yield prisma.form.findMany({ where: { userId } });
        res.json(forms);
    }
    catch (error) {
        res.status(500).json({ error: "Error retrieving forms" });
    }
});
exports.getForms = getForms;
