"use strict";
var restify = require('restify');

var options = {
	name: "Teewa Pando as a Service"
};

var server = restify.createServer(options);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.queryParser({ mapParams: false }));

//max body size 10kb
server.use(restify.bodyParser({
    maxBodySize: 10 * 1024,
    mapParams: false
}));


module.exports = server;
require('./routes');