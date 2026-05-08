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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

newsSchema.pre("validate", function () {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
});

newsSchema.index({
  title: "text",
  summary: "text",
  content: "text",
});

const News = mongoose.model("News", newsSchema);

export default News;
