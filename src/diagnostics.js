'use strict';

const { exec } = require('node:child_process');

function ping(host, callback) {
  // Demo 7: shell command built from user input (command injection)
  exec('ping -c 1 ' + host, (err, stdout) => callback(err, stdout));
}

module.exports = { ping };
