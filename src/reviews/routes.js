'use strict';

const reviews = require('./model');

// Returns a JSON-serializable response for GET /api/reviews?sku=
function getReviews(query) {
  const sku = String(query.sku || '');
  if (!sku) return { status: 400, body: { error: 'sku is required' } };
  return {
    status: 200,
    body: { sku, average: reviews.averageRating(sku), reviews: reviews.listReviews(sku) },
  };
}

module.exports = { getReviews };
