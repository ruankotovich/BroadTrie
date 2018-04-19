"use strict";
let restify = require('restify');
let rp = require('request-promise');
const URL = require('./process').apps[0].urls.API_SERVER;
const fs = require("fs");
const path = require("path");

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

    const ingredients = fs.readFileSync(path.join(process.cwd(), "config", "ingredients.txt")).toString().split('\n');
    
    for(let ingredient of ingredients){
        let obj = {
            name:ingredient
        };
        let result = CanonicalTrie.emplace(ingredient, obj);
    }
}

async function main(){
    await loadIngredients();
} 
main();
module.exports = server;
require('./routes');