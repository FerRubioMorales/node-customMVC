/**
 * Created by fer on 6/03/16.
 */
"use strict";

class ErrorHandler {


    static controllerNotFound(res, error){

        console.trace(error);
        res.statusCode = 500;
        res.write("Controller not found");
        res.end();



    }

    static actionNotFound(res, error){
        console.trace(error);
        res.statusCode = 500;
        res.write("Action not found");
        res.end();
    }


}

module.exports = ErrorHandler;