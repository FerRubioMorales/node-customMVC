/**
 * Created by fer on 4/03/16.
 */
var app = require("../lib/App");
var test = require('unit.js');


describe('App', function() {

    it('tengo request', function(){

        app = new app();

        console.log("app es", app);
    });


});