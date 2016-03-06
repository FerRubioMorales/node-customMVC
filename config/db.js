var mongoAdapter = require('sails-mongo');
var Waterline = require('waterline');

var orm = new Waterline();

var config = {
    adapters: {
        mongodb: mongoAdapter
    },

    connections: {
        mongo: {
            adapter: 'mongodb',
            host: 'localhost', // defaults to `localhost` if omitted
            port: 27017, // defaults to 27017 if omitted
            user: 'username_here', // or omit if not relevant
            password: 'password_here', // or omit if not relevant
            database: 'database_name_here' // or omit if not relevant
        }
    }
};

var fs   = require('fs');
var path = require("path");

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = require(path.join(__dirname, file));
        orm.loadCollection(model);
    });

module.exports = {waterline: orm, config: config};