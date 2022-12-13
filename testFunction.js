import { strict as assert } from 'node:assert';

function sum(a, b) {
    return a + b;
}

assert.equal(sum(2, 2), 4);
