/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global casper */
'use strict';

var config = require('../lib/config');
var helpers = require('../lib/helpers');
var path = '/';
var url = config.base() + path;

casper.test.begin('Home page, Template: ' + url, 9, function suite(test) {

    casper.start(url, function() {

        // Page loaded
        test.assertHttpStatus(200);

        // Mozilla wordmark
        test.assertExists('.main-header h1');

        // Home page promos
        test.assertElementCount('.promo-grid > li', 16);

        // Contribute CTA button exists
        test.assertExists('#community .contribute-btn');

        // Featured event
        test.assertExists('#upcoming-events .featured-event');

        // Upcoming events list
        test.assertElementCount('#upcoming-events .events-list > li > a', 3);

        // All events CTA button
        test.assertExists('#upcoming-events .more-large');

        // Secondary links
        test.assertElementCount('#secondary-links ul > li > a', 3);

        // Newsletter signup form
        test.assertExists('.footer-newsletter-form');

    });

    casper.run(function() {
        helpers.done();
    });
});

casper.test.begin('Home page, Newsletter submission: ' + url, 1, function suite(test) {

    casper.start(url, function() {
        this.fillSelectors('#mozorg-newsletter-form', {
            '#id_email': 'noreply@mozilla.com',
            '#id_privacy': true
        }, true);
    });

    casper.then(function() {
        this.waitForUrl(/sign-up-for-mozilla/, function() {
            test.assertUrlMatch(/sign-up-for-mozilla/, 'Newsletter submitted successfully');
        });
    });

    casper.run(function() {
        helpers.done();
    });
});
