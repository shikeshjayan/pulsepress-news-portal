import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    category: {
      type: String,
      enum: [
        "general",
        "business",
        "entertainment",
        "health",
        "science",
        "sports",
        "technology",
      ],
      required: true,
    },

    summary: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "scheduled", "in-review", "published"],
      default: "draft",
    },

    scheduledAt: {
      type: Date,
      default: null,
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    author: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Auto-generate a URL-friendly slug from the title before each validation
newsSchema.pre("validate", function () {
  if (this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
});

// Full-text search index on title, summary, and content for potential search features
newsSchema.index({
  title: "text",
  summary: "text",
  content: "text",
});

const News = mongoose.model("News", newsSchema);

export default News;
