/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global casper */
'use strict';

var config = require('../lib/config');
var helpers = require('../lib/helpers');
var path = '/firefox/os/2.0/';
var url = config.base() + path;

casper.test.begin('Firefox OS, Layout: ' + url, 11, function suite(test) {

    casper.start(url, function() {

        // Page loaded
        test.assertHttpStatus(200);

        // Firefox OS wordmark
        test.assertExists('.fxos-cta > h1 > img');

        // Firefox OS phone image
        test.assertExists('.phone-container > img');

        // Get a Phone CTA buttons
        test.assertElementCount('.primary-cta-phone', 2);

        // Sign up newsletter buttons
        test.assertElementCount('.primary-cta-signup', 2);

        // Marketplace button
        test.assertExists('.cta-button.marketplace');

        // Firefox OS news links
        test.assertElementCount('.fxos-news a', 4);

        // Community learn more links
        test.assertExists('.fxos-community .more');

        // Help links
        test.assertElementCount('.fxos-help a', 7);

        // Provider links
        test.assertExists('#provider-links');

        // Newsletter form
        test.assertExists('#newsletter-form');
    });

    casper.run(function() {
        helpers.done();
    });
});

casper.test.begin('Firefox OS, Apps for all you do: ' + url, 3, function suite(test) {

    casper.start(url, function() {
        this.click('#connected');
    });

    casper.then(function() {
        this.waitForSelector('#connected.active-state', function() {
            test.assert(true, 'Navigation state updated');
        });

        this.waitForSelector('.fxos-apps .apps .organized.fade', function() {
            test.assert(true, 'Organized icons faded out');
        });

        this.waitForSelector('.fxos-apps .apps .entertained.fade', function() {
            test.assert(true, 'Entertained icons faded out');
        });
    });

    casper.run(function() {
        helpers.done();
    });
});

casper.test.begin('Firefox OS, Open Newsletter modal: ' + url, 2, function suite(test) {

    casper.start(url, function() {
        this.click('.primary-cta-signup');
    });

    casper.then(function() {
        this.waitUntilVisible('#modal', function() {
            test.assert(true, 'Newsletter modal opened successfully');
            test.assertExists('#modal #newsletter-form');
        });
    });

    casper.run(function() {
        helpers.done();
    });
});

casper.test.begin('Firefox OS, Open Purchase modal: ' + url, 2, function suite(test) {

    casper.start(url, function() {
        this.click('.primary-cta-phone');
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

casper.test.begin('Firefox OS, Close modal: ' + url, 1, function suite(test) {

    casper.start(url, function() {
        this.click('.primary-cta-phone');
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
