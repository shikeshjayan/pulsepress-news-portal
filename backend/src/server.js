import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import newsRoutes from "./routes/news.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
  }
};
startServer();
