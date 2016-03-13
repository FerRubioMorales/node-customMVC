/**
 * Created by fer on 4/03/16.
 */
"use strict";

/**
 *
 * @type {*|exports|module.exports}
 * app.getInstance().run will start the app
 */
let app = require("./lib/App");

app.getInstance().registerMiddlewares("/", function(req,res,next){
    console.log("just a middleware");
    next();
});


app.getInstance().registerMiddlewares("/", function(req,res,next){
    console.log("just the second middleware on /");
    next();
});

app.getInstance().registerMiddlewares("/pepe", function(req, res, next){

    res.statusCode = 500;
    res.write("Who's pepe?");
    res.end();
    return;
});

app.getInstance().run();