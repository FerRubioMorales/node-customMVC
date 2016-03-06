/**
 * Created by fer on 4/03/16.
 */
var homeController = require('../app/controllers/home');
var baseController = require("../lib/Controller");
var test = require('unit.js');


describe('Home Controller', function() {

    it('es instanciable', function(){
        home = new homeController();

        test.object(home).isInstanceOf(baseController);
    });

    it('debe tener el metodo render', function(){
        home = new homeController();

        test.object(home).hasKey('render');
    });

    it('no debe tener este metodo', function(){
        home = new homeController();

        test.object(home).notHasKey('test');
    });

    it('el metodo render debe devolver un mensaje de que ha de ser implementado', function(){
        home = new homeController();

        var result = home.render();

        test.assert.equal("should implement this method", result);

    });

    it("podemos llamar al metodo estatico sin instanciar", function(){

        test.assert.equal(homeController.staticfunction(), "es estatico");
    });
});