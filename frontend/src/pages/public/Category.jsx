import { useEffect, useState } from "react";
import { useNews } from "../../hooks/useNews";
import { Link } from "react-router-dom";

const Category = () => {
  const { news, loading, error } = useNews();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (news.length > 0) {
      const categories = [...new Set(news.map((item) => item.category))];
      setCategories(categories);
    }
  }, [news]);
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          All Categories
        </h2>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && categories.length === 0 && (
        <p className="text-gray-500">No news available.</p>
      )}

      {!loading && !error && categories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...categories].sort((a, b) => a.localeCompare(b)).map((category) => (
            <Link
              key={category}
              to={`/category/${category}`}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 p-6 block">
              <h3 className="text-xl font-bold text-gray-900">
                {category}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Category;
