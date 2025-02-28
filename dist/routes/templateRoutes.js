"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const templateController_1 = require("../controllers/templateController");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.authenticateUser, templateController_1.createTemplate);
router.get("/", authMiddleware_1.authenticateUser, templateController_1.getTemplates);
exports.default = router;
