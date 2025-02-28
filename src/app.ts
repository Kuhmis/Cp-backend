import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import templateRoutes from "./routes/templateRoutes";
import formRoutes from "./routes/formRoutes";
import adminRoutes from "./routes/adminRoutes";
import errorMiddleware from "./middleware/errorMiddleware";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/templates", templateRoutes);
app.use("/forms", formRoutes);
app.use("/admin", adminRoutes);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
