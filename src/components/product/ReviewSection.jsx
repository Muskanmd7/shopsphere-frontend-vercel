import React, { useEffect, useState } from 'react';
import { Star, Pencil, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getProductReviews, addReview, updateReview, deleteReview } from '../../services/reviewService';
import { getFriendlyErrorMessage } from '../../utils/errorMessage';

function StarInput({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          type="button"
          key={n}
          onClick={() => onChange(n)}
          className="p-0.5"
          aria-label={`${n} star`}
        >
          <Star
            className={`w-6 h-6 transition-colors ${n <= value ? 'text-amber-400 fill-amber-400' : 'text-surface-200 fill-surface-200'}`}
          />
        </button>
      ))}
    </div>
  );
}

function StarRow({ rating, size = 'w-3.5 h-3.5' }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`${size} ${i < Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-surface-200 fill-surface-200'}`} />
      ))}
    </div>
  );
}

function getReviewerName(review) {
  if (!review) return 'Anonymous';
  const u = review.user;
  if (!u) return 'Anonymous';
  if (typeof u === 'string') return u;
  return u.username || u.name || u.fullName || 'Anonymous';
}

function isOwnReview(review) {
  const currentUsername = localStorage.getItem('username');
  if (!currentUsername) return false;
  const reviewerName = getReviewerName(review);
  return reviewerName && reviewerName === currentUsername;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function ReviewSection({ productId }) {
  const { showNotification } = useApp();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editText, setEditText] = useState('');
  const [savingEdit, setSavingEdit] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProductReviews(productId);
      const sorted = [...(res.data || [])].sort(
        (a, b) => new Date(b.reviewDate) - new Date(a.reviewDate)
      );
      setReviews(sorted);
    } catch (err) {
      console.error(err);
      setError(getFriendlyErrorMessage(err, "We couldn't load reviews right now."));
    } finally {
      setLoading(false);
    }
  };

  const totalReviews = reviews.length;
  const averageRating = totalReviews
    ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / totalReviews
    : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (rating < 1 || rating > 5) {
      setFormError('Please select a star rating.');
      return;
    }
    if (!reviewText.trim()) {
      setFormError('Please write a short review before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      await addReview(productId, { rating, review: reviewText.trim() });
      setRating(0);
      setReviewText('');
      showNotification?.('Review submitted!', 'success');
      await fetchReviews();
    } catch (err) {
      console.error(err);
      setFormError(getFriendlyErrorMessage(err, 'Failed to submit review.'));
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (review) => {
    setEditingId(review.reviewId);
    setEditRating(review.rating || 0);
    setEditText(review.review || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditRating(0);
    setEditText('');
  };

  const saveEdit = async (reviewId) => {
    if (editRating < 1 || editRating > 5 || !editText.trim()) return;
    setSavingEdit(true);
    try {
      await updateReview(reviewId, { rating: editRating, review: editText.trim() });
      showNotification?.('Review updated', 'success');
      cancelEdit();
      await fetchReviews();
    } catch (err) {
      console.error(err);
      showNotification?.(getFriendlyErrorMessage(err, 'Failed to update review.'), 'error');
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Delete this review? This cannot be undone.')) return;
    setDeletingId(reviewId);
    try {
      await deleteReview(reviewId);
      showNotification?.('Review deleted', 'info');
      await fetchReviews();
    } catch (err) {
      console.error(err);
      showNotification?.(getFriendlyErrorMessage(err, 'Failed to delete review.'), 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Summary */}
      {!loading && !error && totalReviews > 0 && (
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-surface-100">
          <span className="text-3xl font-display font-semibold text-surface-800">{averageRating.toFixed(1)}</span>
          <div>
            <StarRow rating={averageRating} size="w-4 h-4" />
            <p className="text-xs text-surface-300 mt-1">{totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}</p>
          </div>
        </div>
      )}

      {/* Write a review */}
      <div className="mb-8 p-5 bg-surface-50 rounded-2xl">
        <h4 className="font-display font-semibold text-surface-800 mb-3">Write a Review</h4>
        <form onSubmit={handleSubmit} className="space-y-3">
          <StarInput value={rating} onChange={setRating} />
          <textarea
            className="input-field min-h-24 resize-none"
            placeholder="Share your thoughts about this product…"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          {formError && <p className="text-xs text-blush-500">{formError}</p>}
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? 'Submitting…' : 'Submit Review'}
          </button>
        </form>
      </div>

      {/* Reviews list */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-20 bg-surface-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-surface-300 text-sm mb-3">{error}</p>
          <button onClick={fetchReviews} className="btn-secondary">Try Again</button>
        </div>
      ) : totalReviews === 0 ? (
        <div className="text-center py-10">
          <p className="text-3xl mb-3">🌷</p>
          <h3 className="font-display text-xl font-semibold text-surface-800">No reviews yet.</h3>
          <p className="text-surface-300 mt-2 text-sm">Be the first to review this product.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => {
            const owner = isOwnReview(review);
            const isEditing = editingId === review.reviewId;
            return (
              <div key={review.reviewId} className="p-4 border border-surface-100 rounded-2xl">
                {isEditing ? (
                  <div className="space-y-3">
                    <StarInput value={editRating} onChange={setEditRating} />
                    <textarea
                      className="input-field min-h-20 resize-none"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(review.reviewId)} disabled={savingEdit} className="btn-primary py-2 px-4 text-sm">
                        {savingEdit ? 'Saving…' : 'Save'}
                      </button>
                      <button onClick={cancelEdit} className="btn-secondary py-2 px-4 text-sm">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-surface-800 text-sm">{getReviewerName(review)}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <StarRow rating={review.rating} />
                          <span className="text-xs text-surface-300">{formatDate(review.reviewDate)}</span>
                        </div>
                      </div>
                      {owner && (
                        <div className="flex items-center gap-2 shrink-0">
                          <button onClick={() => startEdit(review)} className="text-surface-300 hover:text-primary-600 transition-colors" aria-label="Edit review">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(review.reviewId)}
                            disabled={deletingId === review.reviewId}
                            className="text-surface-300 hover:text-blush-500 transition-colors"
                            aria-label="Delete review"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-surface-800 text-sm mt-3 leading-relaxed">{review.review}</p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
