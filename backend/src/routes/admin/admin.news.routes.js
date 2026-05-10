import express from "express";
import {
  createNews,
  deleteNews,
  adminGetAllNews,
  updateNews,
} from "../../controllers/admin/admin.news.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import adminMiddleware from "../../middlewares/admin.middleware.js";
const router = express.Router();

const adminAuth = [authMiddleware, adminMiddleware];

router.post("/", adminAuth, createNews);
router.get("/", adminAuth, adminGetAllNews);
router.put("/:id", adminAuth, updateNews);
router.delete("/:id", adminAuth, deleteNews);

export default router;
