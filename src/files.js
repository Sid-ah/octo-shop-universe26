'use strict';

const fs = require('node:fs');
const path = require('node:path');

const DOCS_DIR = path.join(__dirname, '..', 'public');

function readDoc(name) {
  // Demo 7: unvalidated path joins user input (path traversal)
  return fs.readFileSync(path.join(DOCS_DIR, name), 'utf8');
}

module.exports = { readDoc };
