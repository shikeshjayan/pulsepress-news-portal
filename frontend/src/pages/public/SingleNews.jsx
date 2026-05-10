import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchNewsBySlug } from "../../services/news.service";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const SingleNews = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetchNewsBySlug(slug, {
          signal: controller.signal,
        });

        setArticle(res.data);
      } catch (err) {
        // Ignore abort errors
        if (err.name === "AbortError") return;

        setError(
          err.response?.status === 404
            ? "not_found"
            : "Failed to load article.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [slug]);

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading article...
      </div>
    );
  if (error === "not_found")
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Article not found.
      </div>
    );
  if (error || !article)
    return (
      <div className="text-center py-20 text-red-500 text-lg">
        Failed to load article.
      </div>
    );

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <div className="relative w-full h-105 rounded-xl overflow-hidden mb-8">
        <img
          src={article.imageUrl}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <span className="absolute bottom-4 left-4 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider bg-red-600 text-white rounded-full">
          {article.category}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
        {article.title}
      </h1>

      <div className="flex items-center gap-3 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
        <span className="font-medium text-gray-700">{article.author}</span>
        <span className="w-1 h-1 bg-gray-400 rounded-full" aria-hidden="true" />
        <span>{formatDate(article.publishedAt)}</span>
      </div>

      <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
        {article.summary}
      </p>

      <div className="text-gray-700 leading-relaxed space-y-5 text-base">
        {article.content.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph.trim()}</p>
        ))}
      </div>
    </article>
  );
};

export default SingleNews;
