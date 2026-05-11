import express from "express";
import {
  createNews,
  deleteNews,
  adminGetAllNews,
  updateNews,
} from "../../controllers/admin/news.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import adminMiddleware from "../../middleware/admin.middleware.js";
const router = express.Router();

// All admin routes require both JWT authentication AND admin role
const adminAuth = [authMiddleware, adminMiddleware];

router.post("/", adminAuth, createNews);
router.get("/", adminAuth, adminGetAllNews);
router.put("/:id", adminAuth, updateNews);
router.delete("/:id", adminAuth, deleteNews);

export default router;
