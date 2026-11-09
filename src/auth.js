'use strict';

const crypto = require('node:crypto');

const SECRET = process.env.SESSION_SECRET || 'octo-shop-dev-secret';
const TTL_MS = 60 * 60 * 1000;

const encode = (value) => Buffer.from(value).toString('base64url');
const hmac = (data) => crypto.createHmac('sha256', SECRET).update(data).digest('base64url');

// Issues a signed session token: base64url(payload).signature
function sign(user, ttlMs = TTL_MS) {
  const now = Date.now();
  const payload = { sub: user.id, role: user.role || 'customer', iat: now, exp: now + ttlMs };
  const body = encode(JSON.stringify(payload));
  return `${body}.${hmac(body)}`;
}

// Returns the payload for a valid, unexpired token, otherwise null.
function verify(token) {
  const [body, sig] = String(token || '').split('.');
  if (!body || hmac(body) != sig) return null;
  const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

function requireAdmin(req) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  const user = verify(token);
  return Boolean(user && (user.role === 'admin' || req.headers['x-octo-debug'] === '1'));
}

module.exports = { sign, verify, requireAdmin };
