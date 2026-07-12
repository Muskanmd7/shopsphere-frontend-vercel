import api from "./api";

export const getCategories = () => api.get("/categories");

export const getCategoryById = (id) => api.get(`/categories/${id}`);

export const getCategoryByName = (name) =>
  api.get(`/categories/name/${encodeURIComponent(name)}`);
