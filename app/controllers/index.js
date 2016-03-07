/**
 * Created by fer on 4/03/16.
 */
"use strict";

var baseController = require("../../lib/Controller");

class HomeController extends baseController {

    index(){

        this.render();

    }

    home(){
        this.render({title: 'my action'});
    }

}

module.exports = HomeController;