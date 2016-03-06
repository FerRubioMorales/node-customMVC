/**
 * Created by fer on 6/03/16.
 */
"use strict";

var App = require("../App");
var swig = require("swig");

class Swig {

    constructor(){
        this.layoutsPath = App.getConfig().paths.layouts;
        this.initRenderer();
    }

    initRenderer(){
        let layoutsPath = this.layoutsPath;
        swig.setDefaults({loader: swig.loaders.fs(layoutsPath)});
    }

    renderFile(viewPath, data) {

        swig.renderFile(viewPath, data, function (err, html) {
            App.getResponse().setHeader('Content-Type', 'text/html');
            console.log(err);
            if (err) {
                App.getResponse().statusCode = 500;
                App.getResponse().write("Wops something goes wrong");
            } else {
                App.getResponse().write(html);
            }
            App.getResponse().end();

        }.bind(this));
    }

    render(viewPath, data){

        this.renderFile(viewPath, data);


    }

}

module.exports = Swig;