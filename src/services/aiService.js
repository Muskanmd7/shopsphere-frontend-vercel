import api from "./api";

// Simple in-memory cache so we only ever call the backend once per product,
// even if the popup unmounts/remounts (e.g. user re-opens the same product).
const recommendationCache = new Map();

export function getCachedRecommendation(productId) {
  return recommendationCache.has(productId) ? recommendationCache.get(productId) : null;
}

export function setCachedRecommendation(productId, text) {
  recommendationCache.set(productId, text);
}

const REQUEST_TIMEOUT_MS = 10000;

/**
 * Calls POST /ai/recommend?productId={productId}
 * No request body. Response is plain text (not JSON), so we tell axios not
 * to try to parse/transform it.
 */
export async function fetchAIRecommendation(productId) {
  const cached = getCachedRecommendation(productId);
  if (cached !== null) {
    return cached;
  }

  const response = await api.post("/ai/recommend", null, {
    params: { productId },
    responseType: "text",
    timeout: REQUEST_TIMEOUT_MS,
    transformResponse: [(data) => data],
  });

  const text = typeof response.data === "string" ? response.data : String(response.data);
  setCachedRecommendation(productId, text);
  return text;
}

/**
 * Best-effort parser for the backend's plain-text format so we can render a
 * nicer UI. Falls back gracefully (returns null) if the text doesn't match
 * the expected shape, in which case the raw text should be shown instead.
 */
export function parseRecommendationText(text) {
  if (!text || typeof text !== "string") return null;

  const getSection = (label, isList) => {
    const regex = new RegExp(
      `${label}\\s*:?\\s*\\n?([\\s\\S]*?)(?=\\n\\s*(?:Compatibility Score|Recommendation|Reasons|Pros|Cons|Shopping Tip)\\s*:|$)`,
      "i"
    );
    const match = text.match(regex);
    if (!match) return isList ? [] : "";
    const raw = match[1].trim();
    if (!isList) return raw.split("\n")[0].trim();
    return raw
      .split("\n")
      .map((line) => line.replace(/^[-•*]\s*/, "").trim())
      .filter(Boolean);
  };

  const scoreMatch = text.match(/Compatibility Score\s*:?\s*(\d{1,3})\s*%/i);
  const score = scoreMatch ? Math.min(100, parseInt(scoreMatch[1], 10)) : null;
  const recommendation = getSection("Recommendation");
  const reasons = getSection("Reasons", true);
  const pros = getSection("Pros", true);
  const cons = getSection("Cons", true);
  const tip = getSection("Shopping Tip");

  // If we couldn't find the core fields, treat this as unparseable.
  if (score === null && !recommendation) return null;

  return { score, recommendation, reasons, pros, cons, tip };
}
