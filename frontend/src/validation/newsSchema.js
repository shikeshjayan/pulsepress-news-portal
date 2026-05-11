// Yup validation schemas for news create/update forms
import * as yup from "yup";

const categories = [
  "general", "business", "entertainment", "health",
  "science", "sports", "technology",
];

export const createNewsSchema = yup.object({
  title: yup.string().trim().required("Title is required"),
  category: yup
    .string()
    .trim()
    .required("Category is required")
    .oneOf(categories, "Invalid category"),
  summary: yup.string().trim().required("Summary is required"),
  content: yup.string().trim().required("Content is required"),
  imageUrl: yup.string().trim().required("Image URL is required").url("Must be a valid URL"),
  author: yup.string().trim(),
  status: yup.string().oneOf(["draft", "published", "scheduled", "in-review"], "Invalid status"),
  scheduledAt: yup.string().nullable(),
});

export const updateNewsSchema = yup.object({
  title: yup.string().trim().required("Title is required"),
  category: yup
    .string()
    .trim()
    .required("Category is required")
    .oneOf(categories, "Invalid category"),
  summary: yup.string().trim().required("Summary is required"),
  content: yup.string().trim().required("Content is required"),
  imageUrl: yup.string().trim().required("Image URL is required").url("Must be a valid URL"),
  author: yup.string().trim(),
  status: yup.string().oneOf(["draft", "published", "scheduled", "in-review"], "Invalid status"),
  scheduledAt: yup.string().nullable(),
});
