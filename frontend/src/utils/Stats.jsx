import { useContext } from "react";
import { NewsContext } from "../context/NewsContext";

const statMeta = [
  { key: "total", label: "Total Posts", border: "border-l-blue-500" },
  { key: "published", label: "Published", border: "border-l-green-500" },
  { key: "draft", label: "Drafts", border: "border-l-yellow-500" },
  { key: "scheduled", label: "Scheduled", border: "border-l-purple-500" },
  { key: "inReview", label: "In Review", border: "border-l-orange-500" },
];

const Stats = () => {
  const { news = [] } = useContext(NewsContext);
  const stats = {
    total: news.length,
    published: news.filter((item) => item.status === "published").length,
    draft: news.filter((item) => item.status === "draft").length,
    scheduled: news.filter((item) => item.status === "scheduled").length,
    inReview: news.filter((item) => item.status === "in-review").length,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
      {statMeta.map(({ key, label, border }) => (
        <div
          key={key}
          className={`bg-white rounded-xl shadow p-5 flex flex-col gap-2 border-l-4 ${border}`}
        >
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {label}
          </span>
          <span className="text-3xl font-bold text-gray-900">
            {stats[key]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stats;
