import News from "../models/News.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
// Create News
export const createNews = asyncHandler(async (req, res) => {
  const { title, category, summary, content, imageUrl, status, scheduledAt } =
    req.body;
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

  const news = await News.create({
    title,
    category,
    summary,
    content,
    imageUrl,
    status,
    scheduledAt,
  });
  res
    .status(201)
    .json({ success: true, message: "News created successfully", data: news });
});
//  Get All News
export const getAllNews = asyncHandler(async (req, res) => {
  const newsList = await News.find().sort({ createdAt: -1 }).lean();
  res.status(200).json({ success: true, data: newsList });
});
// Get News by Slug
export const getNewsBySlug = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const news = await News.findOne({ slug }).lean();
  if (!news) {
    return res.status(404).json({ success: false, message: "News not found" });
  }
  res.status(200).json({ success: true, data: news });
});
// Get News By Category
export const getNewsByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category;
  const newsList = await News.find({ category }).sort({ createdAt: -1 }).lean();
  res.status(200).json({ success: true, data: newsList });
});
//  Update News
export const updateNews = asyncHandler(async (req, res) => {
  const news = await News.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).lean();
  if (!news) {
    return res.status(404).json({ success: false, message: "News not found" });
  }
  res
    .status(200)
    .json({ success: true, message: "News updated successfully", data: news });
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
