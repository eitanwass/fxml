'use strict';

const r = require('../index');
const assert = require('assert');

describe('<root/>', () => {
    it('should return an empty object', done => {
        const json = r.parse('<root/>');
        assert(typeof json === 'object' && json !== null && Object.keys(json) !== null);
        done();
    });
});
