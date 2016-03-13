/**
 * Created by fer on 5/03/16.
 */
"use strict";

let url  = require('url'), fs   = require('fs'), app = require("./App"), errorHandler = require("./ErrorHandler");

class Router {

    constructor(){
        /**
         * Parse route will set this as true If the requested resource is media
         * @type {boolean}
         */
        this.isMedia =  false;
        /**
         * Used for assign middlewares on the current pathname
         */
        this.rawPath = url.parse(app.getRequest().url);
        /**
         * Parsed path. This will be used for get requested controller, action and params
         * @type {Array.<T>}
         */
        this.path = this.parseRoute();
        this.controller = this.extractController();
        this.action = this.extractAction();
        this.params = this.extractParams();
    }

    /**
     * This route will be used for detect requested controller, action and params
     * @returns {Array.<T>}
     */
    parseRoute(){

        var parts = this.rawPath;

        if( (/\.(gif|ico|jpg|jpeg|tiff|png)$/i).test(parts.pathname) ){
            this.isMedia = true;
        }

        return parts.pathname.split("/").filter(function(path){
            if(path!="")
                return path;
        });
    }

    /**
     * Set router.controller from the requested action controller in url. Default index
     * @returns {string}
     */
    extractController(){

        var controller = "index";
        if(this.path.length && this.path[0])
            controller = this.path[0];

        return controller;
    }

    /**
     * Set router.action from the requested action controller in url. Default index
     * @returns {string}
     */
    extractAction(){
        var action = "index";

        if(this.path && this.path[1])
            action = this.path[1];

        return action;
    }

    /**
     * Will set params from the current url, this params will be passed to the action in the requested controller
     * @returns {Array}
     */
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

    /**
     * Return the controller object or false if does not exists
     * @returns {object|boolean}
     */
    getRequestedController(){

        try{
            let requestedController = require("../app/controllers/"+this.controller);
            return new requestedController();
        }catch(error){
            if(app.getConfig().debugEnabled){
                console.log("No se ha encontrado el controlador",error);
            }
            return false;
        }

    }

    /**
     * Check if the given action exists on controller
     * @param controller
     * @param action
     * @returns {boolean}
     */
    actionExistsOnController(controller, action){

            let requestedAction = this.action;
            return typeof controller[action] == "function";

    }


    /**
     * Execute middlewares on the current path
     * TODO: Middleware path as regexp
     * @returns {*}
     */
    executeMiddlewares(){

        /**
         * Object that has path as key an middlewares as an array of each path
         * @type {Object|array}
         */
        let middlewares = app.getInstance().getMiddlewares();

        /**
         * EL actual pathname, se utiliza para cargar middlewares registrados en el
         * @type {*|string|string}
         */
        let currentPath = this.rawPath.pathname;

        /**
         * El primer middleware en ser ejecutado. Es la base para incrementar el siguiente middleware
         * @type {number}
         */
        let currentPathMiddleware = 0;

        if( middlewares[currentPath].length && middlewares[currentPath][0] && typeof middlewares[currentPath][0] == "function" ){

            return middlewares[currentPath][currentPathMiddleware](app.getRequest(), app.getResponse(), function next(){
                currentPathMiddleware++;
                return middlewares[currentPath][currentPathMiddleware](app.getRequest(), app.getResponse(), next);
            });

        }

        /**
         * If any middleware found, launch error
         */
        return errorHandler.actionNotFound();

    }

    /**
     * THis method should return a renderer file from controller action.
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    executeController(req, res, next){

        let controller = this.getRequestedController();
        let action = this.action;

        if(!controller){
            return errorHandler.controllerNotFound(new Error("Controlador no encontrado"));
        }

        if(this.actionExistsOnController(controller, action)){

            return controller[action](this.params);

        }else{
            return errorHandler.actionNotFound(new Error("NO se puede ejecutar este action"));

        }



    }

    /**
     * Write favicon
     */
    executeMedia(){
        var img = fs.readFileSync(app.getConfig().paths.images+'/'+this.path[0]);
        app.getResponse().writeHead(200, {'Content-Type': 'image/x-icon' });
        app.getResponse().end(img, 'binary');
    }


    /**
     * Main router method. This method will call the correct renderer method
     * @returns {*}
     */
    execute(){

        let currentPath = this.rawPath.pathname;

        if(this.isMedia){
            return this.executeMedia();
        }else{
            app.getInstance().registerMiddlewares(currentPath, function(){
                this.executeController()
            }.bind(this));

            return this.executeMiddlewares();
        }
    }



}

module.exports = Router;