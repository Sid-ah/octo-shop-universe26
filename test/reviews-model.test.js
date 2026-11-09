'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const reviews = require('../src/reviews/model');

test('stores reviews and averages ratings', () => {
  reviews.reset();
  reviews.addReview('plush', { rating: 5, text: 'So soft', author: 'mona' });
  reviews.addReview('plush', { rating: 4, text: 'Cute', author: 'hubot' });
  assert.equal(reviews.listReviews('plush').length, 2);
  assert.equal(reviews.averageRating('plush'), 4.5);
  assert.equal(reviews.averageRating('hoodie'), null);
});

test('rejects out-of-range ratings', () => {
  assert.throws(() => reviews.addReview('plush', { rating: 6 }), RangeError);
});
