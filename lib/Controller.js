/**
 * Created by fer on 4/03/16.
 */
"use strict";

var fs = require("fs");
var swig = require("swig");
var App = require("./App");

class Controller {

    constructor(router){
        this.app = App;
        this.name = 'index';
    }


    index(){
        this.render({test: 'test'});
    }


    fillDataWithAuto(data){

        data = data || {};

        data.title = data.title || App.getRouter().action;

        return data;

    }

    render(data,actionName){

        data = this.fillDataWithAuto(data);

        actionName = actionName || App.getRouter().action;
        data['title'] = actionName;

        let dirname = App.getRouter().controller;
        let viewPath = App.getConfig().paths.views+"/"+dirname+"/"+actionName+".html";

        let layoutPath = App.getConfig().paths.layouts;
        this.renderFile(layoutPath, viewPath, data);


    }

    renderFile(layoutPath, viewPath, data) {
        swig.setDefaults({loader: swig.loaders.fs(layoutPath)});

        swig.renderFile(viewPath, data, function (err, html) {
            if (err) {
                App.getResponse().statusCode = 500;
                App.getResponse().write("Wops something goes wrong");
            } else {
                App.getResponse().setHeader('Content-Type', 'text/html');
                App.getResponse().write(html);
            }
            App.getResponse().end();

        }.bind(this));
    }
}

module.exports = Controller;