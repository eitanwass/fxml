'use strict';

const assert = require('assert');
const r = require('../index');
const x = '<x><a>1</a><b>10</b></x>';

describe('parse_int_values', () => {
    it('should parse value as integer, parse_int_values = true', () => {
        const o = r.parse(x);

        assert.equal(o.a, 1);
        assert.equal(o.b, 10);
    });

    it('should not parse value as integer, parse_int_values = false', () => {
        const o = r.parse(x, { parse_int_values: false });
        assert.equal(o.a, '1');
        assert.equal(o.b, '10');
    });
});
