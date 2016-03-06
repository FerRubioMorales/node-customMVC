/**
 * Created by fer on 6/03/16.
 */
"use strict";

let currentEnv = process.env.NODE_ENV || 'dev';

let paths = require("./paths");
let db = require("./db");
let env = require("./env/"+currentEnv);

module.exports = {

    paths: paths,
    db: db,
    env: env,
    debugEnabled: env.debug

};