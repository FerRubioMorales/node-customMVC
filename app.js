/**
 * Created by fer on 4/03/16.
 */
"use strict";

/**
 *
 * @type {*|exports|module.exports}
 * app is singleton
 */
let app = require("./lib/App");

app.getInstance().run();