'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('../src/server');

test('health and cart endpoints respond', async (t) => {
  const server = createServer().listen(0);
  t.after(() => server.close());
  const base = `http://localhost:${server.address().port}`;

  const health = await (await fetch(`${base}/api/health`)).json();
  assert.deepEqual(health, { ok: true });

  const items = encodeURIComponent(JSON.stringify([{ price: 6.5, qty: 2 }]));
  const cart = await (await fetch(`${base}/api/cart/total?items=${items}`)).json();
  assert.equal(cart.total, 13);

  const products = await (await fetch(`${base}/api/products?search=Mona`)).json();
  assert.equal(products[0].name, 'Mona hoodie');
});
