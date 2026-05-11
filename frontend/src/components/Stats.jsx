// Admin dashboard stats card — computes counts for each news status from all articles
// Follows the app-wide data-fetching pattern: loading → error/not_found → data render
import { useEffect, useState } from "react";
import { fetchAllNews } from "../services/news.service";

const statMeta = [
  { key: "total", label: "Total Posts", border: "border-l-blue-500" },
  { key: "published", label: "Published", border: "border-l-green-500" },
  { key: "draft", label: "Drafts", border: "border-l-yellow-500" },
  { key: "scheduled", label: "Scheduled", border: "border-l-purple-500" },
  { key: "inReview", label: "In Review", border: "border-l-orange-500" },
];

const Stats = () => {
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadNews = async (signal) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchAllNews({ signal });
      setAllNews(res.data);
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
    loadNews(controller.signal);
    return () => controller.abort();
  }, []);
  const stats = {
    total: allNews.length,
    published: allNews.filter((item) => item.status === "published").length,
    draft: allNews.filter((item) => item.status === "draft").length,
    scheduled: allNews.filter((item) => item.status === "scheduled").length,
    inReview: allNews.filter((item) => item.status === "in-review").length,
  };

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading stats...
      </div>
    );
  if (error === "not_found")
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Stats not found.
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
      {statMeta.map(({ key, label, border }) => (
        <div
          key={key}
          className={`bg-white rounded-xl shadow p-5 flex flex-col gap-2 border-l-4 ${border}`}>
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {label}
          </span>
          <span className="text-3xl font-bold text-gray-900">{stats[key]}</span>
        </div>
      ))}
    </div>
  );
};

export default Stats;
