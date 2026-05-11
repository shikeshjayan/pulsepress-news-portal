// Admin news management page — list, filter by status, edit, delete with pagination
// Follows the app-wide data-fetching pattern: loading → error/not_found → data render
import { useEffect, useState } from "react";
import { fetchAllNews, deleteNews } from "../../services/news.service";
import EditNews from "./EditNews";
import Pagination from "../../components/Pagination";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const AllNews = () => {
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loadedImages, setLoadedImages] = useState(() => new Set());
  const itemsPerPage = 9;

  // Fetch all news (admin view) with optional status filter; aborts on unmount
  const loadNews = async (signal, status) => {
    try {
      setLoading(true);
      setError(null);
      const config = { signal };
      if (status) config.params = { status };
      const res = await fetchAllNews(config);
      setAllNews(res.data);
      setLoadedImages(new Set());
    } catch (err) {
      if (err.name === "AbortError" || err.name === "CanceledError") return;
      setError(
        err.response?.status === 404 ? "not_found" : "Failed to load news.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    loadNews(controller.signal, selectedStatus);
    return () => controller.abort();
  }, [selectedStatus]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteNews(deletingId);
      const updated = allNews.filter((article) => article._id !== deletingId);
      setAllNews(updated);
      if (currentPage > Math.ceil(updated.length / itemsPerPage)) {
        setCurrentPage((prev) => Math.max(1, prev - 1));
      }
    } catch {
      alert("Failed to delete news.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading news...
      </div>
    );
  if (error === "not_found")
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        News not found.
      </div>
    );
  if (error || !allNews)
    return (
      <div className="text-center py-20 text-red-500 text-lg">
        Failed to load news.
      </div>
    );

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          All News
        </h2>
        <select
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="in-review">In Review</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allNews
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((article) => (
            <div
              key={article.slug}
              onClick={() => setEditingArticle(article)}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer">
              <div className="relative h-48 overflow-hidden bg-gray-200">
                {!loadedImages.has(article.imageUrl) && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  loading="lazy"
                  onLoad={() =>
                    setLoadedImages((prev) => new Set(prev).add(article.imageUrl))
                  }
                  className={`w-full h-full object-cover group-hover:scale-105 transition-opacity duration-300 ${loadedImages.has(article.imageUrl) ? "opacity-100" : "opacity-0"}`}
                />
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-red-600 text-white rounded-full">
                  {article.category}
                </span>
                <button
                  onClick={(e) => handleDelete(e, article._id)}
                  aria-label={`Delete ${article.title}`}
                  className="absolute top-2 right-2 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-sm md:text-base font-bold bg-red-600 text-white rounded-full z-10 cursor-pointer leading-none hover:bg-red-700 transition-colors">
                  X
                </button>
              </div>

              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-2 flex-1">
                  {article.summary}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500 flex-wrap">
                  <span className="font-medium text-gray-700">
                    {article.author}
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full shrink-0" />
                  <span>{formatDate(article.publishedAt)}</span>
                  {article.status && (
                    <span className={`px-2 py-0.5 rounded-full font-medium ${
                      article.status === "published"
                        ? "bg-green-100 text-green-700"
                        : article.status === "draft"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                    }`}>
                      {article.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      <DeleteConfirmationModal
        isOpen={!!deletingId}
        onCancel={() => setDeletingId(null)}
        onConfirm={confirmDelete}
        title="Delete News"
        message="Are you sure you want to delete this news? This action cannot be undone."
      />

      {editingArticle && (
        <EditNews
          article={editingArticle}
          onClose={() => setEditingArticle(null)}
          onUpdated={() => loadNews(null, selectedStatus)}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(allNews.length / itemsPerPage)}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
};

export default AllNews;
