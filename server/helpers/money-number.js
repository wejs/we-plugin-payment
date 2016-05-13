/**
 * We {{money-number}}  helper
 *
 * usage:  {{money-number value}}
 */

module.exports = function() {
  return function helper(value) {
    if (!value) return '0.00';

    return Number(value).toFixed(2);
  }
}