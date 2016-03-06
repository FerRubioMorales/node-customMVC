/**
 * Created by fer on 5/03/16.
 */
"use strict";

let url  = require('url'), fs   = require('fs'), app = require("./App"), errorHandler = require("./ErrorHandler");

class Router {

    constructor(){
        this.isMedia =  false;
        this.path = this.parseRoute();
        this.controller = this.extractController();
        this.action = this.extractAction();
        this.params = this.extractParams();
    }

    parseRoute(){

        console.log(app.getRequest());
        var parts = url.parse(app.getRequest().url);

        if( (/\.(gif|ico|jpg|jpeg|tiff|png)$/i).test(parts.path) ){
            this.isMedia = true;
        }

        return parts.path.split("/").filter(function(path){
            if(path!="")
                return path;
        });
    }

    extractController(){

        var controller = "index";
        if(this.path.length && this.path[0])
            controller = this.path[0];

        return controller;
    }

    extractAction(){
        var action = "index";

        if(this.path && this.path[1])
            action = this.path[1];

        return action;
    }

    extractParams(){

        var params = [];

        if(this.path && this.path[2]){

            var paramsArray = this.path[2].split(",");
            paramsArray.forEach(function(param){
                var obj = param.split(":");

                if(obj.length == 2)
                    params.push({[obj[0]]: obj[1]});
                if(obj.length == 1)
                    params.push(obj[0]);

            })
        }

        return params;

    }

    getRequestedController(){

        try{
            let requestedController = require("../app/controllers/"+this.controller);
            return new requestedController();
        }catch(error){
            errorHandler.controllerNotFound(app.getResponse(), error)
        }

    }

    actionExistsOnController(controller, action){

        try{
            let requestedAction = this.action;
            return typeof controller[action] == "function";

        }catch(error){
            errorHandler.actionNotFound(app.getResponse(), error)
        }

    }

    executeController(){

        let controller = this.getRequestedController();
        let action = this.action;

        if(this.actionExistsOnController(controller, action))
            controller[action](this.params);


    }

    executeMedia(){
        var img = fs.readFileSync(app.config.paths.images+'/favicon.ico');
        app.getResponse().writeHead(200, {'Content-Type': 'image/x-icon' });
        app.getResponse().end(img, 'binary');
    }

    execute(){

        if(this.isMedia){
            this.executeMedia();

        }else{
            this.executeController();
        }
    }



}

module.exports = Router;