/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global casper */
'use strict';

var config = require('../lib/config');
var helpers = require('../lib/helpers');
var path = '/firefox/os/devices/';
var url = config.base() + path;

casper.test.begin('Firefox OS Devices, Template: ' + url, 5, function suite(test) {

    casper.start(url, function() {

        // Page loaded
        test.assertHttpStatus(200);

        // Location picker exists
        test.assertExists('#location');

        // Phones section exists
        test.assertExists('#smartphones');

        // Provider links exist
        test.assertExists('#provider-links');

        // Purchase buttons exist
        test.assertElementCount('.purchase-button', 2);

    });

    casper.run(function() {
        helpers.done();
    });
});

casper.test.begin('Firefox OS Devices, Open purchase modal: ' + url, 2, function suite(test) {

    casper.start(url, function() {
        this.fillSelectors('#form-locations', {
            '#location': 'ar'
        });
        this.click('.purchase-button');
    });

    casper.then(function() {
        this.waitUntilVisible('#modal', function() {
            test.assert(true, 'Purchase modal opened successfully');
            test.assertExists('#modal #get-device');
        });
    });

    casper.run(function() {
        helpers.done();
    });
});

casper.test.begin('Firefox OS Devices, Close purchase modal: ' + url, 1, function suite(test) {

    casper.start(url, function() {
        this.fillSelectors('#form-locations', {
            '#location': 'ar'
        });
        this.click('.purchase-button');
    });

    casper.then(function() {
        this.waitUntilVisible('#modal', function() {
            this.click('#modal-close');
            this.waitWhileVisible('#modal', function() {
                test.assert(true, 'Purchase modal closed successfully');
            });
        });
    });

    casper.run(function() {
        helpers.done();
    });
});
