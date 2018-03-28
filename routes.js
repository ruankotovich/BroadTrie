"use strict";

let restify = require('restify');
let server = require("./server");
let src = require("./src/js/pando/index");
let prefix = '/pando';
let VERSION = '1.0.0';
    
server.get({ path: prefix, version: VERSION }, src.search);
server.post({ path: prefix, version: VERSION }, src.insert);