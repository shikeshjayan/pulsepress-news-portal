// Latest news grid — shows the 6 most recent published articles with image lazy-loading
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNews } from "../../../hooks/useNews";
import { formatDate } from "../../../utils/formatDate";

const GridSkeleton = () => (
  <section className="max-w-7xl mx-auto px-4 py-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md">
          <div className="h-48 bg-gray-200 animate-pulse" />
          <div className="p-5 space-y-3">
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  </section>
);

const NewsGrid = () => {
  const { news, loading, error } = useNews();
  const [loadedImages, setLoadedImages] = useState(() => new Set());

  if (loading) return <GridSkeleton />;
  if (error)
    return (
      <section
        aria-label="Latest news"
        className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-center text-red-500">Failed to load news.</p>
      </section>
    );

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Latest News
        </h2>
        <Link
          to="/category/all"
          className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
          View All &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6)
          .map((article) => (
            <Link
              key={article.slug}
              to={`/news/${article.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="relative h-48 overflow-hidden bg-gray-200">
                {!loadedImages.has(article.imageUrl) && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  loading="lazy"
                  onLoad={() =>
                    setLoadedImages((prev) =>
                      new Set(prev).add(article.imageUrl),
                    )
                  }
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x400";
                  }}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-opacity duration-300 ${loadedImages.has(article.imageUrl) ? "opacity-100" : "opacity-0"}`}
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
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default NewsGrid;
