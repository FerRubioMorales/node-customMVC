/**
 * Created by fer on 4/03/16.
 */
"use strict";

var fs = require("fs");
var swig = require("swig");
var App = require("./App");
var View = require("./View");

class Controller {

    constructor(router){
        this.runningController = App.getRouter().controller;
        this.runningAction = App.getRouter().action;
        this.view = this.getView();
    }

    getView(){
        let viewPath =  App.getConfig().paths.views+"/"+this.runningController+"/"+this.runningAction+".html";
        return new View(viewPath);
    }

    render(data){
        this.view.render(data);
    }

    index(){
        this.render({test: 'test'});
    }


}

module.exports = Controller;