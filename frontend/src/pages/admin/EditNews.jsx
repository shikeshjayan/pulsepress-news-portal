// Modal form for editing an existing news article — pre-populates fields from the article prop
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateNewsSchema } from "../../validation/newsSchema";
import api from "../../services/api";

const EditNews = ({ article, onClose, onUpdated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(updateNewsSchema),
    values: {
      title: article?.title || "",
      category: article?.category || "",
      author: article?.author || "",
      summary: article?.summary || "",
      content: article?.content || "",
      imageUrl: article?.imageUrl || "",
      status: article?.status || "draft",
      scheduledAt: article?.scheduledAt || "",
    },
  });

  const [selectedStatus, setSelectedStatus] = useState(article?.status || "draft");
  const [errorMessage, setErrorMessage] = useState("");

  if (!article) return null;

  const onSubmit = async (data) => {
    setErrorMessage("");
    try {
      await api.put(`/admin/news/${article._id}`, {
        ...data,
        scheduledAt: data.status === "scheduled" ? data.scheduledAt : null,
      });
      onUpdated?.();
      onClose?.();
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Failed to update news.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Edit News</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer" aria-label="Close">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
            <input id="title" type="text" {...register("title")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
            <select id="category" {...register("category")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Select a category</option>
              <option value="general">General</option>
              <option value="technology">Technology</option>
              <option value="science">Science</option>
              <option value="health">Health</option>
              <option value="business">Business</option>
              <option value="sports">Sports</option>
              <option value="entertainment">Entertainment</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700 font-bold mb-2">Author</label>
            <input id="author" type="text" {...register("author")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>

          <div className="mb-4">
            <label htmlFor="summary" className="block text-gray-700 font-bold mb-2">Summary</label>
            <textarea id="summary" {...register("summary")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
            <textarea id="content" rows="8" {...register("content")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700 font-bold mb-2">Image URL</label>
            <input id="imageUrl" type="text" {...register("imageUrl")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 font-bold mb-2">Status</label>
            <select id="status" {...register("status", {
              onChange: (e) => setSelectedStatus(e.target.value),
            })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-review">In Review</option>
            </select>
          </div>

          {selectedStatus === "scheduled" && (
            <div className="mb-4">
              <label htmlFor="scheduledAt" className="block text-gray-700 font-bold mb-2">Schedule Date</label>
              <input id="scheduledAt" type="datetime-local" {...register("scheduledAt")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          )}

          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <button type="submit" disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline cursor-pointer">
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
            <button type="button" onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline cursor-pointer">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNews;
