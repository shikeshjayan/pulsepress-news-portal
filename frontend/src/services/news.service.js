// Service layer for news API calls — keeps API logic out of components
import api from "./api";

// PUBLIC: Fetch only published news (for homepage banner + grid)
export const fetchNews = async (config = {}) => {
  try {
    const response = await api.get("/news", config);
    return response.data.data;
  } catch (error) {
    if (error.name !== "CanceledError") {
      console.error("Error fetching news:", error);
    }
    throw error;
  }
};

// ADMIN: Fetch all news (any status) — requires auth
export const fetchAllNews = async (config = {}) => {
  try {
    const response = await api.get("/admin/news", config);
    return response.data;
  } catch (error) {
    if (error.name !== "CanceledError") {
      console.error("Error fetching all news:", error);
    }
    throw error;
  }
};

// PUBLIC: Fetch a single published article by its slug
export const fetchNewsBySlug = async (slug, config = {}) => {
  try {
    const response = await api.get(`/news/${slug}`, config);
    return response.data;
  } catch (error) {
    if (error.name !== "CanceledError") {
      console.error("Error fetching news by slug:", error);
    }
    throw error;
  }
};

// PUBLIC: Fetch published articles for a specific category
export const fetchNewsByCategory = async (categoryId, config = {}) => {
  try {
    const response = await api.get(`/news/category/${categoryId}`, config);
    return response.data;
  } catch (error) {
    if (error.name !== "CanceledError") {
      console.error("Error fetching news by category:", error);
    }
    throw error;
  }
};

// ADMIN: Update a news article by ID
export const updateNews = async (id, data) => {
  try {
    const response = await api.put(`/admin/news/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating news:", error);
    throw error;
  }
};

// ADMIN: Delete a news article by ID
export const deleteNews = async (id) => {
  try {
    const response = await api.delete(`/admin/news/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting news:", error);
    throw error;
  }
};
