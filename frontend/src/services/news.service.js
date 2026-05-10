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

export const fetchAllNews = async () => {
  try {
    const response = await api.get("/admin/news");
    return response.data;
  } catch (error) {
    console.error("Error fetching all news:", error);
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

export const updateNews = async (id, data) => {
  try {
    const response = await api.put(`/admin/news/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating news:", error);
    throw error;
  }
};

export const deleteNews = async (id) => {
  try {
    const response = await api.delete(`/admin/news/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting news:", error);
    throw error;
  }
};
