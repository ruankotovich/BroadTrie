"use strict";
let { CanonicalTrie } = require("../pando.js");

module.exports = function insert(req, res, next) {
    let body = req.body
    console.log("Insert request body: ", body)
    let result = CanonicalTrie.emplace(body.name, body);
    console.log("Insert response: ", result)
    res.send({"wasInserted": result});
    return next();
};