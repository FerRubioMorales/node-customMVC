/**
 * Created by fer on 6/03/16.
 */
"use strict";
var Waterline = require('waterline');

var User = Waterline.Collection.extend({

    attributes: {

        firstName: {
            type: 'string',
            required: true
        },

        lastName: {
            type: 'string',
            required: true
        }
    }
});

module.exports = User;