import api from "./api";

// Backend already resolves the logged-in user from the JWT, so callers of
// addReview/updateReview must never send a userId in the payload.

export const getProductReviews = (productId) =>
  api.get(`/reviews/product/${productId}`);

export const getMyReviews = () => api.get("/reviews/my");

export const addReview = (productId, { rating, review }) =>
  api.post(`/reviews/${productId}`, { rating, review });

export const updateReview = (reviewId, { rating, review }) =>
  api.put(`/reviews/${reviewId}`, { rating, review });

export const deleteReview = (reviewId) => api.delete(`/reviews/${reviewId}`);
