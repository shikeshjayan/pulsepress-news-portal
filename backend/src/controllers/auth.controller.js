import User from "../models/User.model.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user with validated email and hashed password
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Valid email is required" });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }
  const existingUser = await User.findOne({ email: email.toLowerCase() }).lean();
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }
  // Hash password with bcrypt before storing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashedPassword });
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    userId: user._id,
  });
});

// Authenticate user, issue JWT stored in an httpOnly cookie (prevents XSS access)
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Explicitly select +password since the schema excludes it by default
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password").lean();
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  // httpOnly cookie = not readable by JS; SameSite=strict prevents CSRF
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    secure: process.env.NODE_ENV === "production",
  });
  const userData = await User.findById(user._id).select("-password").lean();
  res.json({ success: true, message: "Login successful", token, user: userData });
});

// Return the authenticated user's profile (password excluded by default)
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.userId)
    .select("-password")
    .lean();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ success: true, user });
});

// Clear the JWT cookie to end the session
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ success: true, message: "Logout successful" });
};

// Change password: verify current password, then hash and save the new one
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.userId)
    .select("+password")
    .lean();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  await User.findByIdAndUpdate(req.user.userId, { password: hashedPassword });
  res.json({ success: true, message: "Password changed successfully" });
});
