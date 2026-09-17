import React, { useEffect, useState, useRef } from "react";
import { Sparkles, X, RefreshCw, CheckCircle2, XCircle, LogIn } from "lucide-react";
import {
  fetchAIRecommendation,
  getCachedRecommendation,
  parseRecommendationText,
} from "../services/aiService";

const BADGE_STYLES = {
  excellent: "bg-sage-100 text-sage-600 border border-sage-200",
  good: "bg-blue-100 text-blue-600 border border-blue-200",
  average: "bg-amber-100 text-amber-700 border border-amber-200",
  poor: "bg-red-100 text-red-600 border border-red-200",
  default: "bg-[#F9D8E5] text-[#C2185B] border border-[#F9D8E5]",
};

function badgeClass(recommendation) {
  const rec = (recommendation || "").toLowerCase();
  if (rec.includes("excellent")) return BADGE_STYLES.excellent;
  if (rec.includes("good")) return BADGE_STYLES.good;
  if (rec.includes("average")) return BADGE_STYLES.average;
  if (rec.includes("poor")) return BADGE_STYLES.poor;
  return BADGE_STYLES.default;
}

function SkeletonLoader() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-[#C2185B]">
        ✨ AI is checking your preferences...
      </p>
      <div className="animate-pulse space-y-2.5">
        <div className="h-4 bg-[#F9D8E5] rounded-full w-2/3" />
        <div className="h-3 bg-[#FDECEF] rounded-full w-full" />
        <div className="h-3 bg-[#FDECEF] rounded-full w-5/6" />
        <div className="h-3 bg-[#FDECEF] rounded-full w-3/4" />
      </div>
    </div>
  );
}

export default function AIRecommendationPopup({ productId }) {
  const [closed, setClosed] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // { type: 'auth' | 'server' | 'timeout' | 'generic', message }
  const [rawText, setRawText] = useState(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (!productId) return;

    // A new product was selected: reopen the popup automatically.
    setClosed(false);
    setError(null);

    const cached = getCachedRecommendation(productId);
    if (cached !== null) {
      setRawText(cached);
      setLoading(false);
      return;
    }

    setRawText(null);
    setLoading(true);

    const requestId = ++requestIdRef.current;

    fetchAIRecommendation(productId)
      .then((text) => {
        if (requestIdRef.current !== requestId) return; // stale response
        setRawText(text);
        setLoading(false);
      })
      .catch((err) => {
        if (requestIdRef.current !== requestId) return;
        setLoading(false);
        const status = err?.response?.status;
        if (status === 401) {
          setError({ type: "auth", message: "Please login to view AI recommendations." });
        } else if (status === 500) {
          setError({ type: "server", message: "AI recommendation is temporarily unavailable." });
        } else if (err?.code === "ECONNABORTED") {
          setError({ type: "timeout", message: "This is taking longer than expected." });
        } else {
          setError({ type: "generic", message: "AI recommendation is temporarily unavailable." });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    // trigger the entrance animation on next tick
    const t = setTimeout(() => setMounted(true), 20);
    return () => clearTimeout(t);
  }, []);

  const handleRetry = () => {
    if (!productId) return;
    setError(null);
    setLoading(true);
    const requestId = ++requestIdRef.current;
    fetchAIRecommendation(productId)
      .then((text) => {
        if (requestIdRef.current !== requestId) return;
        setRawText(text);
        setLoading(false);
      })
      .catch((err) => {
        if (requestIdRef.current !== requestId) return;
        setLoading(false);
        const status = err?.response?.status;
        if (status === 401) {
          setError({ type: "auth", message: "Please login to view AI recommendations." });
        } else if (status === 500) {
          setError({ type: "server", message: "AI recommendation is temporarily unavailable." });
        } else {
          setError({ type: "generic", message: "AI recommendation is temporarily unavailable." });
        }
      });
  };

  if (!productId || closed) return null;

  const parsed = rawText ? parseRecommendationText(rawText) : null;

  return (
    <div
      className={`fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[75vh] overflow-y-auto
        rounded-3xl shadow-2xl border border-[#F9D8E5] backdrop-blur-xl
        transition-all duration-300 ease-out
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{
        background: "linear-gradient(160deg, rgba(255,245,247,0.92) 0%, rgba(253,236,239,0.92) 100%)",
      }}
      role="dialog"
      aria-label="AI Compatibility Analysis"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#F9D8E5]/80">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C2185B]" />
          <h3 className="text-sm font-semibold text-[#C2185B]">AI Compatibility Analysis</h3>
        </div>
        <button
          onClick={() => setClosed(true)}
          aria-label="Close AI recommendation"
          className="text-[#C2185B]/60 hover:text-[#C2185B] hover:bg-white/60 rounded-full p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        {loading && <SkeletonLoader />}

        {!loading && error && (
          <div className="flex flex-col items-center text-center gap-3 py-3">
            {error.type === "auth" ? (
              <LogIn className="w-6 h-6 text-[#C2185B]" />
            ) : (
              <XCircle className="w-6 h-6 text-[#C2185B]" />
            )}
            <p className="text-sm text-surface-800">{error.message}</p>
            {error.type !== "auth" && (
              <button
                onClick={handleRetry}
                className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#E75480] hover:bg-[#C2185B] px-4 py-2 rounded-2xl transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retry
              </button>
            )}
          </div>
        )}

        {!loading && !error && rawText && parsed && (
          <div className="space-y-4">
            {/* Score */}
            {parsed.score !== null && (
              <div className="flex items-center justify-between bg-white/70 rounded-2xl px-4 py-3">
                <span className="text-xs font-medium text-surface-300">Compatibility Score</span>
                <span className="text-2xl font-bold text-[#C2185B]">{parsed.score}%</span>
              </div>
            )}

            {/* Recommendation badge */}
            {parsed.recommendation && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-surface-300">Recommendation</span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeClass(parsed.recommendation)}`}>
                  {parsed.recommendation}
                </span>
              </div>
            )}

            {/* Reasons */}
            {parsed.reasons?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-surface-800 mb-1.5">Reasons</p>
                <ul className="space-y-1">
                  {parsed.reasons.map((r, i) => (
                    <li key={i} className="text-xs text-surface-800 flex gap-1.5">
                      <span className="text-[#C2185B]">•</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pros */}
            {parsed.pros?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-surface-800 mb-1.5">Pros</p>
                <ul className="space-y-1">
                  {parsed.pros.map((p, i) => (
                    <li key={i} className="text-xs text-sage-600 flex gap-1.5 items-start">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cons */}
            {parsed.cons?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-surface-800 mb-1.5">Cons</p>
                <ul className="space-y-1">
                  {parsed.cons.map((c, i) => (
                    <li key={i} className="text-xs text-red-500 flex gap-1.5 items-start">
                      <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Shopping tip */}
            {parsed.tip && (
              <div className="bg-white/70 rounded-2xl px-4 py-3">
                <p className="text-xs font-semibold text-[#C2185B] mb-1">💡 Shopping Tip</p>
                <p className="text-xs text-surface-800">{parsed.tip}</p>
              </div>
            )}
          </div>
        )}

        {/* Fallback: unparseable text, display exactly as received */}
        {!loading && !error && rawText && !parsed && (
          <pre className="text-xs text-surface-800 whitespace-pre-wrap font-sans">{rawText}</pre>
        )}
      </div>
    </div>
  );
}
