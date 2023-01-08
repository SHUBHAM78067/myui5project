sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'mickey/util/lifeSaver'
], function(Controller, lifeSaver,) {
    'use strict';
    return Controller.extend("mickey.controller.BaseController",{
        formatter: lifeSaver,
        x: "this is a reuse variable",
        oCore: sap.ui.getCore(),
        someResueableFunction(){
            alert('Bahubali')
        }
    });
});