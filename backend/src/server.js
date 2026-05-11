import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import newsRoutes from "./routes/news.routes.js";
import adminNewsRoutes from "./routes/admin/news.routes.js";

const app = express();

// Allow credentials (cookies) from the Vite dev server origin
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Parse JSON bodies up to 10MB (enough for rich news content)
app.use(express.json({ limit: "10mb" }));
// Parse cookies from incoming requests (needed for JWT in httpOnly cookies)
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Mount route groups — each handles a distinct API domain
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/admin/news", adminNewsRoutes);

// Global Error Handler — catches unhandled errors from all routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server Error" });
});

// Connect to MongoDB, then start the HTTP server
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
