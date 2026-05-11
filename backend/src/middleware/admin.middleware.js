// Role-based access control — only admin users may proceed past this point
const adminMiddleware = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ success: false, message: "Forbidden - Admin access required" });
  }
  next();
};

export default adminMiddleware;
