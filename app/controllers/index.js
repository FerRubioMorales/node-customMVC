/**
 * Created by fer on 4/03/16.
 */
"use strict";

var baseController = require("../../lib/Controller");

class IndexController extends baseController {

    index(){
        this.render({title: 'my action'});
    }

}

module.exports = IndexController;