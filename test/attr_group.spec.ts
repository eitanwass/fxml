'use strict';

const assert = require('assert');
const r = require('../index');
const x = '<x><a attr1="a" attr2="b">val</a></x>';

console.log(r);

describe('group_attrs', () => {
    it('should group by attribute prefix, group_attrs = true, prefix = "@"', () => {
        const oGroupAttr = r.parse(x, { group_attrs: true });
        assert('attr1' in oGroupAttr.a['@'] && 'attr2' in oGroupAttr.a['@']);
    });

    it('should group by attribute prefix, group_attrs = false', () => {
        const oNoGroupAttr = r.parse(x, { group_attrs: false });
        assert('@attr1' in oNoGroupAttr.a && '@attr2' in oNoGroupAttr.a);
    });
});

