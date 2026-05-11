// Admin create-news form with Yup validation and status/schedule support
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createNewsSchema } from "../../validation/newsSchema";
import api from "../../services/api";

const CreateNews = () => {
  const [selectedStatus, setSelectedStatus] = useState("draft");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(createNewsSchema),
    defaultValues: { status: "draft" },
  });

  const onSubmit = async (data) => {
    setErrorMessage("");
    try {
      await api.post("/admin/news", {
        ...data,
        scheduledAt: data.status === "scheduled" ? data.scheduledAt : null,
      });
      reset();
      setSelectedStatus("draft");
      alert("News created successfully!");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Failed to create news.");
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Create News</h2>
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
        <button type="submit" disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer">
          {isSubmitting ? "Creating..." : "Create News"}
        </button>
      </form>
    </div>
  );
};

export default CreateNews;
