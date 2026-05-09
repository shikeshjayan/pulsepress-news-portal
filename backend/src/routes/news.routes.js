import express from "express";
import {
  createNews,
  deleteNews,
  getAllNews,
  getNewsByCategory,
  getNewsBySlug,
  updateNews,
} from "../controllers/news.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createNews);
router.get("/", getAllNews);
router.get("/category/:category", getNewsByCategory);
router.get("/:slug", getNewsBySlug);
router.put("/:id", authMiddleware, updateNews);
router.delete("/:id", authMiddleware, deleteNews);

export default router;
