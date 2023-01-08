sap.ui.define([
    'sap/ui/core/format/NumberFormat'
], function(NumberFormat) {
    'use strict';
    return {
        getAmountFormatted: function(amount,curr){
            var oCurrencyFormat = NumberFormat.getCurrencyInstance({
                currencyCode: false
            });
            var formattedNumber = oCurrencyFormat.format(amount, curr);
            return formattedNumber;
        },
        convertName: function(inp){
            if(inp){
                return inp.toUpperCase();
            }
        }
    };
});