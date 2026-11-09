'use strict';

const _ = require('lodash');

const TEMPLATE = 'Thanks for shopping at Octo Shop, <%= data.name %>! Total: $<%= data.total %>';

function renderReceipt(name, total, variable) {
  // Demo 7 (reachability): lodash < 4.17.21 _.template is vulnerable to command
  // injection through the `variable` option, and this call path is reachable.
  const compiled = _.template(TEMPLATE, { variable: variable || 'data' });
  return compiled({ name, total });
}

module.exports = { renderReceipt };
