import { Link } from "react-router-dom";
import { useNews } from "../../../hooks/useNews";
import { useMemo } from "react";

const FALLBACK_NEWS = [
  {
    slug: "global-tech-summit-2026",
    title: "Global Tech Summit 2026 Unveils Revolutionary AI Breakthroughs",
    category: "technology",
    summary:
      "Industry leaders and innovators gathered in San Francisco to showcase cutting-edge advancements in artificial intelligence.",
    author: "Sarah Chen",
    date: "May 8, 2026",
    imageUrl: "https://placehold.co/800x500/1e293b/ffffff?text=Tech+Summit",
  },
  {
    slug: "climate-research-breakthrough",
    title:
      "New Climate Research Reveals Promising Path to Carbon Neutrality by 2040",
    category: "science",
    summary:
      "A groundbreaking study published in Nature outlines achievable strategies for reaching net-zero emissions within two decades.",
    author: "Marcus Williams",
    date: "May 7, 2026",
    imageUrl:
      "https://placehold.co/800x500/065f46/ffffff?text=Climate+Research",
  },
  {
    slug: "financial-markets-weekly",
    title: "Global Markets Rally as Central Banks Signal Steady Interest Rates",
    category: "business",
    summary:
      "Stock indices worldwide posted gains following coordinated statements from major central banks regarding monetary policy.",
    author: "Elena Rodriguez",
    date: "May 7, 2026",
    imageUrl: "https://placehold.co/800x500/7c2d12/ffffff?text=Markets",
  },
  {
    slug: "health-wellness-2026",
    title:
      "Revolutionary Gene Therapy Trial Shows 90% Success Rate in Treating Rare Diseases",
    category: "health",
    summary:
      "The FDA has fast-tracked approval for a new gene therapy that could transform treatment for millions of patients worldwide.",
    author: "Dr. James Park",
    date: "May 6, 2026",
    imageUrl: "https://placehold.co/800x500/831843/ffffff?text=Gene+Therapy",
  },
  {
    slug: "olympic-preparations",
    title: "Summer Olympics 2026: Host City Reveals State-of-the-Art Venues",
    category: "sports",
    summary:
      "With just months until the opening ceremony, the host city has unveiled impressive venues built with sustainability at their core.",
    author: "Alex Thompson",
    date: "May 6, 2026",
    imageUrl: "https://placehold.co/800x500/1e3a5f/ffffff?text=Olympics",
  },
  {
    slug: "space-exploration-mission",
    title:
      "NASA's Artemis III Mission Successfully Establishes Lunar Research Base",
    category: "technology",
    summary:
      "Astronauts have completed the first phase of construction on a permanent lunar habitat, marking a new chapter in space exploration.",
    author: "Sarah Chen",
    date: "May 5, 2026",
    imageUrl: "https://placehold.co/800x500/312e81/ffffff?text=Lunar+Base",
  },
];

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

const EntertainmentNews = () => {
  const { news, loading, error } = useNews();

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Entertainment News
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news
          .filter((article) => article.category === "Entertainment")
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

export default EntertainmentNews;
