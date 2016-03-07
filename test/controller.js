/**
 * Created by fer on 4/03/16.
 */
var indexController = require('../app/controllers/index');
var baseController = require("../lib/Controller");
var test = require('unit.js');


describe('Home Controller', function() {

    it('es instanciable', function(){
        home = new indexController();

        test.object(home).isInstanceOf(baseController);
    });

    it('debe tener el metodo render', function(){
        home = new indexController();

        test.object(home).hasKey('render');
    });

    it('no debe tener este metodo', function(){
        home = new indexController();

        test.object(home).notHasKey('test');
    });

    it('el metodo render debe devolver un mensaje de que ha de ser implementado', function(){
        home = new indexController();

        var result = home.render();

        test.assert.equal("should implement this method", result);

    });

    it("podemos llamar al metodo estatico sin instanciar", function(){

        test.assert.equal(indexController.staticfunction(), "es estatico");
    });
});