"use strict";
let { CanonicalTrie } = require("../pando.js");

module.exports = function insert(req, res, next) {
    let body = req.body;
    console.log(body);
    let result = CanonicalTrie.emplace(body.name, body);

    res.send({"wasInserted": result});
    return next();
};