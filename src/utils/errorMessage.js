// Maps Axios/HTTP errors to short, user-friendly messages.
export function getFriendlyErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  if (!error) return fallback;

  if (!error.response) {
    return "Network error. Please check your connection and try again.";
  }

  const status = error.response.status;
  const data = error.response.data;
  const serverMessage =
    (data && typeof data === "object" && data.message) ||
    (typeof data === "string" ? data : null);

  switch (status) {
    case 400:
      return serverMessage || "Please check the information you entered and try again.";
    case 401:
      return "Please log in to continue.";
    case 403:
      return "You don't have permission to do that.";
    case 404:
      return serverMessage || "We couldn't find what you were looking for.";
    case 500:
      return "Something went wrong on our end. Please try again shortly.";
    default:
      return serverMessage || fallback;
  }
}
