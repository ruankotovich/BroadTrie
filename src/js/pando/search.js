"use strict";
let { CanonicalTrie } = require("../pando.js");

module.exports = function search(req, res, next) {
    console.log("Search request query: ", req.query)
    let result = CanonicalTrie.search(req.query.q);
    console.log("Search response query: ", result)

    res.send(result);
    return next();
};
