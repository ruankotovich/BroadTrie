"use strict";

var restify = require('restify');
var server = require("./server");
var src = require("./src/js/pando/index");
var prefix = 'api/';
var VERSION = '1.0.0';

var resource = 'pando';
var PATH = prefix + resource;

server.get({ path: PATH, version: VERSION }, src.search);
server.post({ path: PATH, version: VERSION }, src.insert);