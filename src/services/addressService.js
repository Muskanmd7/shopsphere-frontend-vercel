import api from "./api";

// Backend identifies the logged-in user via SecurityContextHolder, so the
// frontend must never send a userId in the payload.

export const getMyAddress = () => api.get("/address/me");

export const createAddress = (payload) => api.post("/address", payload);

export const updateAddress = (addressId, payload) =>
  api.put(`/address/${addressId}`, payload);

export const deleteAddress = (addressId) => api.delete(`/address/${addressId}`);
