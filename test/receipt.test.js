'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { renderReceipt } = require('../src/receipt');

test('renders a receipt', () => {
  assert.match(renderReceipt('Mona', '81.00'), /Thanks for shopping at Octo Shop, Mona! Total: \$81.00/);
});
