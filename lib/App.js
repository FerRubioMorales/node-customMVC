/**
 * Created by fer on 4/03/16.
 */
"use strict";

let http = require('http')
, fs   = require('fs')
, config = require("../config/bootstrap")
, Router = require("./Router");

const PORT = 3000;

var appInstance = null;
let appRequest = Symbol();
let appResponse = Symbol();
let appServer = Symbol();
let appRouter = Symbol();
let appConfig = Symbol();

class App {

    /**
     * Se encarga de montar el servidor web y parsear la ruta actual para obtener
     * que controador y accion es solicitada
     */
    constructor() {
        this.config = config;
    }

    set request(request){
        this[appRequest] = request;
    }

    set response(response){
        this[appResponse] = response;
    }

    set server(server){
        this[appServer] = server;
    }

    set router(router){
        this[appRouter] = router;
    }

    set config(config){
        this[appConfig] = config;
    }

    get request(){
        return this[appRequest];
    }

    get response(){
        return this[appResponse];
    }

    get server(){
        return this[appServer];
    }

    get router(){
        return this[appRouter];
    }

    get config(){
        return this[appConfig];
    }

    getRequest(){
        return this.request;
    }

    getResponse(){
        return this.response;
    }

    getRouter(){
        return this.router;
    }

    getServer(){
        return this.server;
    }

    getConfig(){
        return this.config;
    }

    run(){

        let PORT = this.config.env.PORT;
        let that = this;

        this.server = http.createServer(function(req,res){
            that.request = req;
            that.response = res;
            that.router = new Router();
            that.init();
        });

        this.server.listen(PORT, function () {
            if(that.config.debugEnabled){
                console.log("Esuchando en el puerto " + PORT);
            }
        });

        this.server.on("error", function(err){
           if(that.config.debugEnabled){
               console.log("An error has ocurred: "+err);
           }
        });

    }

    init(){
        this.router.execute();
    }
}

appInstance = new App();

exports.getInstance = function(){
    return appInstance
};

exports.getRequest = function(){
    return appInstance.getRequest()
};

exports.getResponse =  function(){
    return appInstance.getResponse();
};

exports.getServer =  function(){
    return appInstance.getServer();
};

exports.getConfig = function(){
    return appInstance.getConfig();
};

exports.getRouter = function(){
  return appInstance.getRouter();
};