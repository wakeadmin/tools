/* eslint-disable import/no-commonjs */
const exp = require('./dist/index');

module.exports = exp.default;

Object.keys(exp).forEach(e => {
  module.exports[e] = exp[e];
});
