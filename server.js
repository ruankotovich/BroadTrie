"use strict";
let restify = require('restify');
let rp = require('request-promise');
const URL = require('./process').apps[0].urls.API_SERVER;

let { CanonicalTrie } = require("./src/js/pando.js");

let options = {
	name: "Teewa Pando as a Service"
};

let server = restify.createServer(options);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.queryParser({ mapParams: false }));

//max body size 10kb
server.use(restify.bodyParser({
    maxBodySize: 10 * 1024,
    mapParams: false
}));

//carrega a trie
async function loadIngredients(){
    
    let options = {
        method: "GET",
        headers:{"Authorization":"945772e0559b097e16640dc6107815c9ee35fa6c"},
        uri:  URL + "/ingredients",
        json: true // Automatically stringifies the body to JSON
    };

    let response = await rp(options)
    if(response.length != 0){
        for(let ingredient of response){
            let result = CanonicalTrie.emplace(ingredient.name, ingredient);
        }
    }
}

async function main(){
    await loadIngredients();
} 
main();
module.exports = server;
require('./routes');