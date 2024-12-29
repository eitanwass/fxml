'use strict';

const rapidx2j = require('../index');
const assert = require('assert');

describe('<root/>', () => {
    it('should return an empty object', done => {
        const json = rapidx2j.parse('<root/>');
        assert(typeof json === 'object' && json !== null && Object.keys(json) !== null);
        done();
    });
});
