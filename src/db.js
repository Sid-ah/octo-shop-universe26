'use strict';

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync(':memory:');
db.exec(`
  CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL);
  INSERT INTO products (name, price) VALUES
    ('Octocat plush', 24.0), ('Mona hoodie', 55.0), ('Universe sticker pack', 6.5);
`);

function searchProducts(term) {
  // Demo 7: user input concatenated into SQL (SQL injection)
  const sql = "SELECT id, name, price FROM products WHERE name LIKE '%" + term + "%'";
  return db.prepare(sql).all();
}

module.exports = { searchProducts };
