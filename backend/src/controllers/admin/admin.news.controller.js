import News from "../../models/News.model.js";
import asyncHandler from "../../middlewares/asyncHandler.js";
// Create News
export const createNews = asyncHandler(async (req, res) => {
  const {
    title,
    category,
    summary,
    content,
    imageUrl,
    status,
    scheduledAt,
    author,
  } = req.body;
  if (!title || !category || !summary || !content || !imageUrl) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  const existingNews = await News.findOne({ title }).lean();
  if (existingNews) {
    return res
      .status(400)
      .json({ success: false, message: "News with this title already exists" });
  }
  let publishedAt = null;
  if (status === "published") {
    publishedAt = new Date();
  }
  const news = await News.create({
    title,
    category,
    summary,
    content,
    imageUrl,
    status,
    scheduledAt,
    publishedAt,
    author,
  });
  res
    .status(201)
    .json({ success: true, message: "News created successfully", data: news.toObject() });
});
// Admin Get All News
export const adminGetAllNews = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 0;
  const newsList = await News.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  res.status(200).json({ success: true, data: newsList });
});
//  Update News
export const updateNews = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    return res.status(404).json({ success: false, message: "News not found" });
  }
  Object.assign(news, req.body);
  const updated = await news.save();
  res
    .status(200)
    .json({ success: true, message: "News updated successfully", data: updated.toObject() });
});
//  Delete News
export const deleteNews = asyncHandler(async (req, res) => {
  const newsId = req.params.id;
  const news = await News.findByIdAndDelete(newsId);
  if (!news) {
    return res.status(404).json({ success: false, message: "News not found" });
  }
  res.status(200).json({ success: true, message: "News deleted successfully" });
});
