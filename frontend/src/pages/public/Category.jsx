import { Link, useParams } from "react-router-dom";
import { useNews } from "../../hooks/useNews";

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

const Category = () => {
  const { id } = useParams();
  const { news, loading, error } = useNews();

  if (loading) return <p className="text-gray-500 max-w-7xl mx-auto px-4 py-12">Loading...</p>;
  if (error) return <p className="text-red-500 max-w-7xl mx-auto px-4 py-12">{error}</p>;

  const categoryLabel = id ? id.charAt(0).toUpperCase() + id.slice(1) : "All";
  const filtered = id
    ? news.filter((article) => article.category === id)
    : news;

  if (filtered.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          {categoryLabel} News
        </h2>
        <p className="text-gray-500">No news found in this category.</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {categoryLabel} News
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((article) => (
            <Link
              key={article.slug}
              to={`/news/${article.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
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
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default Category;
