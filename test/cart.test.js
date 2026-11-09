'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { cartTotal, discountFor } = require('../src/cart');

const items = [
  { sku: 'plush', price: 24, qty: 2 },
  { sku: 'hoodie', price: 55, qty: 1 },
];

test('cart total without a code', () => {
  assert.equal(cartTotal(items), 103);
});

test('discount codes are case-insensitive', () => {
  assert.equal(discountFor('universe26'), 0.1);
});

// Demo 3 (Copilot Fusion): the 10% UNIVERSE26 code is applied twice.
// Ask Copilot to find the bug, fix it, and turn this todo into a passing test.
test('UNIVERSE26 takes exactly 10% off', { todo: 'Fix double discount (issue: cart total wrong)' }, () => {
  assert.equal(cartTotal(items, 'UNIVERSE26'), 92.7);
});
