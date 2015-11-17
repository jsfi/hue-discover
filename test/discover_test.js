'use strict';

const expect = require('expect.js');

let hueDiscover = require('../');

/*global describe*/
/*global it*/

describe('discover', function() {
    it('bridge', function () {
        this.timeout(45000);

        return hueDiscover()
        .then(bridges => {
            expect(bridges.length).to.be.greaterThan(0);
            expect(bridges[0]).to.match(/(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/);
        });
    });
});
