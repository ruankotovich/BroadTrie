"use strict";

let restify = require('restify');
let server = require("./server");
let src = require("./src/js/pando/index");
let prefix = '/pando';
let VERSION = '1.0.0';
    
server.get({ path: prefix + "/search", version: VERSION }, src.search);
server.get({ path: prefix + "/autocomplete", version: VERSION }, src.autocomplete);
server.post({ path: prefix+ "/insert", version: VERSION }, src.insert);