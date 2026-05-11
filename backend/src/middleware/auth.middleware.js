import jwt from "jsonwebtoken";

// Verify JWT token before accessing protected routes — extracts userId and role into req.user
const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers?.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized - Invalid token" });
  }
};

export default authMiddleware;
