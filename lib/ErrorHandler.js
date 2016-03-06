/**
 * Created by fer on 6/03/16.
 */
"use strict";

var App = require("./App");

class ErrorHandler {


    static controllerNotFound(error){

        App.getResponse().statusCode = 500;
        App.getResponse().write("Controller not found");
        App.getResponse().end("Error");
    }

    static actionNotFound(error){
        App.getResponse().statusCode = 500;
        App.getResponse().write("Action not found");
        App.getResponse().end("Error");
    }


}

module.exports = ErrorHandler;