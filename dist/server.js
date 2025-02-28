"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const templateRoutes_1 = __importDefault(require("./routes/templateRoutes"));
const formRoutes_1 = __importDefault(require("./routes/formRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://course-project-1-7ksf.onrender.com"
}));
app.use(express_1.default.json());
app.use("/auth", authRoutes_1.default);
app.use("/templates", templateRoutes_1.default);
app.use("/forms", formRoutes_1.default);
app.use("/admin", adminRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Running...");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
