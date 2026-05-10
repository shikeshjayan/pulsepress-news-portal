import express from "express";
import {
  getAllNews,
  getNewsByCategory,
  getNewsBySlug,
} from "../controllers/news.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllNews);
router.get("/category/:category", getNewsByCategory);
router.get("/:slug", getNewsBySlug);

export default router;