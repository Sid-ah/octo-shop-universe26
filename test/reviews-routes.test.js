'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const reviews = require('../src/reviews/model');
const { getReviews } = require('../src/reviews/routes');

test('GET /api/reviews requires a sku', () => {
  assert.equal(getReviews({}).status, 400);
});

test('GET /api/reviews returns reviews and the average', () => {
  reviews.reset();
  reviews.addReview('hoodie', { rating: 3, author: 'mona' });
  const res = getReviews({ sku: 'hoodie' });
  assert.equal(res.status, 200);
  assert.equal(res.body.average, 3);
  assert.equal(res.body.reviews[0].author, 'mona');
});
