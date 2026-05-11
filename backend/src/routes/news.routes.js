import express from "express";
import {
  getAllNews,
  getNewsByCategory,
  getNewsBySlug,
} from "../controllers/news.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// All public news routes — only published articles are returned
router.get("/", getAllNews);
router.get("/category/:category", getNewsByCategory);
router.get("/:slug", getNewsBySlug);

export default router;