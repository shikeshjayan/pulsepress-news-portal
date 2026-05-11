import News from "../../models/News.model.js";
import asyncHandler from "../../middleware/asyncHandler.js";

// ADMIN: Create a news article with duplicate-title check
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
  // Set publishedAt timestamp immediately when status is "published"
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
  res.status(201).json({
    success: true,
    message: "News created successfully",
    data: news.toObject(),
  });
});

// ADMIN: Return all news (any status), with optional ?status= filter
export const adminGetAllNews = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 0;
  const filter = {};
  if (req.query.status) {
    filter.status = req.query.status;
  }
  const newsList = await News.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  res.status(200).json({ success: true, data: newsList });
});

// ADMIN: Filter news by a specific status value
export const filterNewsByStatus = asyncHandler(async (req, res) => {
  const { status } = req.query;
  if (!status) {
    return res
      .status(400)
      .json({ success: false, message: "Status query parameter is required" });
  }
  const newsList = await News.find({ status }).sort({ createdAt: -1 }).lean();
  res.status(200).json({ success: true, data: newsList });
});

// ADMIN: Update a news article — Object.assign merges req.body onto the Mongoose doc before save
export const updateNews = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    return res.status(404).json({ success: false, message: "News not found" });
  }
  Object.assign(news, req.body);
  const updated = await news.save();
  res.status(200).json({
    success: true,
    message: "News updated successfully",
    data: updated.toObject(),
  });
});

// ADMIN: Delete a news article by its _id
export const deleteNews = asyncHandler(async (req, res) => {
  const newsId = req.params.id;
  const news = await News.findByIdAndDelete(newsId);
  if (!news) {
    return res.status(404).json({ success: false, message: "News not found" });
  }
  res.status(200).json({ success: true, message: "News deleted successfully" });
});
