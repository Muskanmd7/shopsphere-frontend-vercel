import api from "./api";

export const savePreferences = (data) => {
  return api.post("/preferences", data);
};

export const getPreferences = () => {
  return api.get("/preferences");
};