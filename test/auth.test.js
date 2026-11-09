'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { sign, verify, requireAdmin } = require('../src/auth');

test('round-trips a session token', () => {
  const payload = verify(sign({ id: 'mona' }));
  assert.equal(payload.sub, 'mona');
  assert.equal(payload.role, 'customer');
});

test('rejects a tampered payload', () => {
  const [, sig] = sign({ id: 'mona' }).split('.');
  const forged = Buffer.from(JSON.stringify({ sub: 'mona', role: 'admin', exp: Date.now() * 2 })).toString('base64url');
  assert.equal(verify(`${forged}.${sig}`), null);
});

test('customers are not admins', () => {
  const req = { headers: { authorization: `Bearer ${sign({ id: 'hubot' })}` } };
  assert.equal(requireAdmin(req), false);
});

test('issued-at uses seconds since epoch, like JWT', () => {
  const payload = verify(sign({ id: 'mona' }));
  assert.ok(payload.iat < 1e11, `iat looks like milliseconds: ${payload.iat}`);
});
