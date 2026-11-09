'use strict';

const http = require('node:http');
const { cartTotal } = require('./cart');
const { searchProducts } = require('./db');
const { readDoc } = require('./files');
const { ping } = require('./diagnostics');
const { renderReceipt } = require('./receipt');

function send(res, status, body, type = 'application/json') {
  res.writeHead(status, { 'content-type': type });
  res.end(type === 'application/json' ? JSON.stringify(body) : body);
}

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const q = Object.fromEntries(url.searchParams);
    try {
      switch (url.pathname) {
        case '/api/health':
          return send(res, 200, { ok: true });
        case '/api/cart/total': {
          const items = JSON.parse(q.items || '[]');
          return send(res, 200, { total: cartTotal(items, q.code) });
        }
        case '/api/products':
          return send(res, 200, searchProducts(url.searchParams.get('search') || ''));
        case '/api/docs':
          return send(res, 200, readDoc(url.searchParams.get('name') || 'index.html'), 'text/html');
        case '/api/diagnostics/ping':
          return ping(url.searchParams.get('host') || 'localhost', (err, out) => send(res, err ? 500 : 200, { out }));
        case '/api/receipt':
          return send(res, 200, renderReceipt(url.searchParams.get('name'), url.searchParams.get('total'), url.searchParams.get('var')), 'text/plain');
        default:
          return send(res, 404, { error: 'not found' });
      }
    } catch (err) {
      return send(res, 500, { error: err.message });
    }
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  createServer().listen(port, () => console.log(`Octo Shop on http://localhost:${port}`));
}

module.exports = { createServer };
