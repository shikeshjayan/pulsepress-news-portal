import { useEffect, useMemo, useState } from "react";
import { useNews } from "../../../hooks/useNews";
import { Link } from "react-router-dom";
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

const FALLBACK_NEWS = {
  title: "Global Tech Summit 2026 Unveils Revolutionary AI Breakthroughs",
  category: "technology",
  summary: "Industry leaders and innovators gathered in San Francisco...",
  author: "Sarah Chen",
  date: "May 8, 2026",
  imageUrl: "https://placehold.co/1600x900/1e293b/ffffff?text=Tech+Summit+2026",
};

const NewsBanner = () => {
  const { news, loading, error } = useNews();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (news.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [news]);

  const featured = useMemo(
    () => (news.length > 0 ? news[currentIndex] : FALLBACK_NEWS),
    [news, currentIndex],
  );

  if (loading) return <BannerSkeleton />;
  if (error) return <BannerFallback news={FALLBACK_NEWS} />;

  return (
    <section className="relative w-full h-[70vh] min-h-125 overflow-hidden">
      <img
        src={featured.imageUrl}
        alt={featured.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-5xl mx-auto">
        <span className="inline-block px-4 py-1.5 text-sm font-semibold uppercase tracking-wider bg-red-600 text-white rounded-full mb-4">
          {featured.category}
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
          {featured.title}
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
          {featured.summary}
        </p>

        <div className="mt-4 flex items-center gap-3 text-sm text-gray-400">
          <span className="text-gray-300">{featured.author}</span>
          <span className="w-1 h-1 bg-gray-500 rounded-full" />
          <span>{formatDate(featured.publishedAt)}</span>
        </div>
        <Link
          to={`/news/${featured.slug}`}
          className="mt-4 inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors">
          Read More
        </Link>
      </div>
    </section>
  );
};

const BannerSkeleton = () => (
  <section className="relative w-full h-[70vh] min-h-125 overflow-hidden bg-gray-800 animate-pulse" />
);

const BannerFallback = ({ news }) => (
  <section className="relative w-full h-[70vh] min-h-125 overflow-hidden">
    <img
      src={news.imageUrl}
      alt={news.title}
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-5xl mx-auto">
      <span className="inline-block px-4 py-1.5 text-sm font-semibold uppercase tracking-wider bg-red-600 text-white rounded-full mb-4">
        {news.category}
      </span>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
        {news.title}
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
        {news.summary}
      </p>
      <div className="mt-4 flex items-center gap-3 text-sm text-gray-400">
        <span className="text-gray-300">{news.author}</span>
        <span className="w-1 h-1 bg-gray-500 rounded-full" />
        <span>{formatDate(news.publishedAt)}</span>
      </div>
    </div>
  </section>
);

export default NewsBanner;
