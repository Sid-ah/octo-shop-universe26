'use strict';

const reviews = new Map(); // sku -> [{ rating, text, author }]

function addReview(sku, { rating, text, author }) {
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new RangeError('rating must be an integer from 1 to 5');
  }
  const list = reviews.get(sku) || [];
  const review = { rating, text: String(text || '').slice(0, 500), author: String(author || 'anonymous') };
  list.push(review);
  reviews.set(sku, list);
  return review;
}

function listReviews(sku) {
  return [...(reviews.get(sku) || [])];
}

function averageRating(sku) {
  const list = listReviews(sku);
  if (list.length === 0) return null;
  return Math.round((list.reduce((sum, r) => sum + r.rating, 0) / list.length) * 10) / 10;
}

function reset() {
  reviews.clear();
}

module.exports = { addReview, listReviews, averageRating, reset };
