import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useNews } from "../../hooks/useNews";

const FALLBACK_NEWS = {
  title: "Global Tech Summit 2026 Unveils Revolutionary AI Breakthroughs",
  category: "technology",
  summary:
    "Industry leaders and innovators gathered in San Francisco to showcase cutting-edge advancements in artificial intelligence, promising a new era of human-machine collaboration.",
  author: "Sarah Chen",
  date: "May 8, 2026",
  imageUrl:
    "https://placehold.co/1600x900/1e293b/ffffff?text=Tech+Summit+2026",
  content: `The annual Global Tech Summit kicked off this week with a stunning array of innovations that left attendees and industry experts alike in awe of the rapid pace of technological advancement.
Day one featured a keynote from Dr. Elena Marquez, CEO of NovaMind AI, who demonstrated their latest neural network architecture capable of real-time language translation with near-human nuance and emotional intelligence.
"what we're seeing today is not just incremental improvement," Dr. Marquez stated. "This represents a fundamental shift in how machines understand and interact with human communication."
The demonstration included live translation between eight languages simultaneously, with the system accurately conveying tone, humor, and cultural context — areas where previous systems have struggled significantly.
Following the keynote, a panel of ethicists and technologists discussed the implications of such powerful technology, emphasizing the need for robust governance frameworks as these tools become more integrated into daily life.
Other notable announcements included a breakthrough in quantum computing stability from researchers at MIT, and a new open-source framework for federated learning that promises to enhance privacy in machine learning applications.
The summit continues through Friday, with workshops and networking sessions scheduled alongside the main stage presentations.`,
};

const SingleNews = () => {
  const { slug } = useParams();
  const { news, loading, error } = useNews();

  const article = useMemo(
    () => news.find((item) => item.slug === slug) ?? FALLBACK_NEWS,
    [news, slug],
  );

  if (loading) return <div className="text-center py-20 text-gray-500 text-lg">Loading article...</div>;
  if (error) return <div className="text-center py-20 text-red-500 text-lg">Failed to load article.</div>;
  if (!article) return <div className="text-center py-20 text-gray-500 text-lg">Article not found.</div>;

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <div className="relative w-full h-105 rounded-xl overflow-hidden mb-8">
        <img
          src={article.imageUrl}
          alt={article.title}
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
        <span>{article.date}</span>
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
