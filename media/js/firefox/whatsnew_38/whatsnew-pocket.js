/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

$(function(){
    'use strict';

    var $pageContent = $('#outer-wrapper');
    var $modalContent = $('#modal-content');
    var $videoEmbed = $modalContent.find('.video-embed');
    var videoTitle = $modalContent.find('h2').text();
    var $video = $('#whatsnew-video');
    var $videoThumbnail = $modalContent.find('.video-thumbnail');

    // opens the campaign video in mozid modal
    function initVideoModal() {
        Mozilla.Modal.createModal($pageContent[0], $videoEmbed, {
            title: videoTitle
        });

        // auto close the modal after video finishes
        $video.on('ended', function() {
            setTimeout(function() {
                Mozilla.Modal.closeModal();
                // track video end event in GTM
                window.dataLayer.push({
                    'event': 'firstrun-38.0.5-whatsnew-video',
                    'interaction': 'finish',
                    'videoTitle': 'When its Personal Campaign Video'
                });
            }, 1000);
         });

        // hide thumbnail and play video on click
        $videoThumbnail.on('click', function (e) {
            e.preventDefault();
            $videoThumbnail.hide();
            setTimeout(function() {
                $video[0].play();
                // track play event in GTM
                window.dataLayer.push({
                    'event': 'firstrun-38.0.5-whatsnew-video',
                    'interaction': 'start',
                    'videoTitle': 'When its Personal Campaign Video'
                });
            }, 150);
        });
    }

    // show video modal on page load only for those locales who have it
    if ($modalContent.length === 1) {
        initVideoModal();
    }
});
