// ==UserScript==
// @name         CoinigyHelper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.coinigy.com/main/markets/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // show in console we are startin'
    console.log('Coinigy Rom\'s JS script loaded');

    // ****************************************************************
    // functions to manipulate the Coinigy UI
    // ****************************************************************
    function nextCurrency() {
        $('.list-group-item.market_list_entry.market_list_entry_selected').next().click();
    }
    function prevCurrency() {
        $('.list-group-item.market_list_entry.market_list_entry_selected').prev().click();
    }
    function toggleRightPanel() {
        $('#resizer').click();
    }

    // ****************************************************************
    // handle all the events
    // ****************************************************************
    function handleCoinigyKeydownEvent(evt) {
        // space key
        if (evt.keyCode == 32) {
            if (evt.shiftKey) {
                prevCurrency();
            } else {
                nextCurrency();
            }
            evt.preventDefault();
        }
        // P = toggle right pannel
        if (evt.keyCode == 80) {
            toggleRightPanel();
            evt.preventDefault();
        }
    }
    function handleTradingViewKeydownEvent(evt) {
        // handle all the Coinigy key events first
        handleCoinigyKeydownEvent(evt);

        // interval click, number 0 to 9 :
        if (evt.keyCode >= 48 && evt.keyCode <= 57) {
            $('.intervals-list .item')[(evt.keyCode - 48)].click();
            // $($('iframe').get()[0].contentWindow.document)
            //                     $($('iframe').get()[0].contentWindow.document).
        }
    }

    $(function() {
        // Coinigy keydown event handler
        $(document).keydown(function(evt) {
            handleCoinigyKeydownEvent(evt);
        });
        // TradingView keydown event handler, within iframe
        $($('iframe').get()[0].contentWindow.document).keydown(function(evt) {
            handleTradingViewKeydownEvent(evt);
        });

    });
})();

