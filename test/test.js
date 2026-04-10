const assert = require('assert');

function add(a, b) {
  return a + b;
}

assert.equal(add(2, 3), 5);

console.log("All tests passed!");