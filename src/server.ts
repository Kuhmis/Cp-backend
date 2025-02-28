import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import templateRoutes from "./routes/templateRoutes";
import formRoutes from "./routes/formRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();
const app = express();

app.use(cors(
  {
    origin: "https://course-project-1-7ksf.onrender.com"
  }
));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/templates", templateRoutes);
app.use("/forms", formRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));