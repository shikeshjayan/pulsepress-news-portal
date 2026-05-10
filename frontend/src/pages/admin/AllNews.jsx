import { useEffect, useState } from "react";
import { fetchAllNews } from "../../services/news.service";
import EditNews from "./EditNews";
import Pagination from "../../utils/Pagination";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const AllNews = () => {
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);

  const loadNews = async (signal) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchAllNews({ signal });
      setAllNews(res.data);
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(
        err.response?.status === 404 ? "not_found" : "Failed to load news.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    loadNews(controller.signal);
    return () => controller.abort();
  }, []);

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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allNews
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 9)
          .map((article) => (
            <div
              key={article.slug}
              onClick={() => setEditingArticle(article)}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-red-600 text-white rounded-full">
                  {article.category}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-2 flex-1">
                  {article.summary}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
                  <span className="font-medium text-gray-700">
                    {article.author}
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>{formatDate(article.publishedAt)}</span>
                  <span>{article.status}</span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {editingArticle && (
        <EditNews
          article={editingArticle}
          onClose={() => setEditingArticle(null)}
          onUpdated={() => loadNews()}
        />
      )}
      <Pagination />
    </section>
  );
};

export default AllNews;
