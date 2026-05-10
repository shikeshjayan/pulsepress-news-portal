import { useState } from "react";
import api from "../../services/api";

const CreateNews = () => {
  const [status, setStatus] = useState("draft");
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      category: formData.get("category"),
      summary: formData.get("summary"),
      content: formData.get("content"),
      imageUrl: formData.get("imageUrl"),
      author: formData.get("author") || undefined,
      status: formData.get("status") || "draft",
      scheduledAt: formData.get("scheduledAt") || null,
    };

    try {
      const res = await api.post("/news", data);
      console.log("RES", data);
      alert("News created successfully!");
      e.target.reset();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to create news. Please try again.",
      );
    }
  };
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-2xl font-bold">Create News</h2>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-bold mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
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
        </div>
        <div className="mb-4">
          <label
            htmlFor="author"
            className="block text-gray-700 font-bold mb-2">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="summary"
            className="block text-gray-700 font-bold mb-2">
            Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-700 font-bold mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows="8"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-gray-700 font-bold mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-gray-700 font-bold mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            id="status"
            name="status"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-review">In Review</option>
          </select>
        </div>
        {status === "scheduled" && (
          <div className="mb-4">
            <label
              htmlFor="scheduledAt"
              className="block text-gray-700 font-bold mb-2">
              Schedule Date
            </label>
            <input
              type="datetime-local"
              id="scheduledAt"
              name="scheduledAt"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Create News
        </button>
      </form>
    </div>
  );
};

export default CreateNews;
