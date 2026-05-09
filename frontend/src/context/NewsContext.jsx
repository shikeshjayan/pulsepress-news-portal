import { createContext, useEffect, useState } from "react";
import { fetchNews } from "../services/news.service";

export const NewsContext = createContext();
const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchNews()
      .then((data) => {
        setNews(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Failed to load news for banner:", err);
          setError("Failed to load news");
        }
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);
  return (
    <NewsContext.Provider value={{ news, loading, error }}>
      {children}
    </NewsContext.Provider>
  );
};

export default NewsProvider;
