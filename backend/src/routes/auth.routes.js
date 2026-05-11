import express from "express";
import {
  register,
  login,
  getProfile,
  logout,
  changePassword,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes — no authentication required
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Protected routes — require valid JWT from authMiddleware
router.get("/profile", authMiddleware, getProfile);
router.put("/change-password", authMiddleware, changePassword);

export default router;
