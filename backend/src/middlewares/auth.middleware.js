import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers?.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized - Invalid token" });
  }
};

export default authMiddleware;
