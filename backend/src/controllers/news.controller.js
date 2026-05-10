import News from "../models/News.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
//  Get All News
export const getAllNews = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 0;
  const newsList = await News.find({ status: "published" })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  res.status(200).json({ success: true, data: newsList });
});
// Get News by Slug
export const getNewsBySlug = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const news = await News.findOne({ slug, status: "published" }).lean();
  if (!news) {
    return res.status(404).json({ success: false, message: "News not found" });
  }
  res.status(200).json({ success: true, data: news });
});
// Get News By Category
export const getNewsByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category;
  const newsList = await News.find({ category, status: "published" })
    .sort({ createdAt: -1 })
    .lean();
  res.status(200).json({ success: true, data: newsList });
});

