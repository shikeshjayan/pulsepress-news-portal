import api from "./api";

export const fetchNews = async () => {
  try {
    const response = await api.get("/news");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

export const fetchNewsBySlug = async (slug) => {
  try {
    const response = await api.get(`/news/${slug}`);
    return response.data;
    } catch (error) {
    console.error("Error fetching news by slug:", error);
    throw error;
  }
};

export const fetchNewsByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/news/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching news by category:", error);
    throw error;
  }
};
