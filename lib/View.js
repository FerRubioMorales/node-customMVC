/**
 * Created by fer on 4/03/16.
 */
"use strict";

var App = require("./App");

class View {

    constructor(filePath, options){

        options = options || {};

        this.filePath = filePath;
        this.includeAutoScripts = options.includeAutoScripts || true;
        this.includeAutoStyles = options.includeAutoStyles || true;
        this.renderer = this.getRenderer();
    }

    getRenderer(){
        let renderer = require("./ViewRenderers/Swig");
        return new renderer();
    }

    render(data){
        data = this.populateDataWithUtils(data);
        this.renderer.render(this.filePath, data);
    }

    populateDataWithUtils(data){

        data = data || {};

        data.title = data.title || App.getRouter().action;
        data.stylesPath = App.getConfig().paths.styles;
        data.scripts = App.getConfig().paths.js;

        return data;

    }

}

module.exports = View;