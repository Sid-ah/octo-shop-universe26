'use strict';

// Prices are stored in dollars. Codes map to a percentage discount.
const DISCOUNT_CODES = {
  UNIVERSE26: 0.1,
  MONA: 0.05,
};

function discountFor(code) {
  return DISCOUNT_CODES[String(code || '').toUpperCase()] || 0;
}

function lineTotal(item, code) {
  const rate = discountFor(code);
  return item.price * item.qty * (1 - rate);
}

function cartTotal(items, code) {
  let subtotal = 0;
  for (const item of items) {
    subtotal += lineTotal(item, code);
  }
  const rate = discountFor(code);
  const total = subtotal - subtotal * rate;
  return Math.round(total * 100) / 100;
}

module.exports = { cartTotal, discountFor, lineTotal, DISCOUNT_CODES };
