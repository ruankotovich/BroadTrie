"use strict";
let { CanonicalTrie } = require("../pando.js");

module.exports = function autocomplete(req, res, next) {
    console.log("Autocomplete request query: ", req.query)
    let result = CanonicalTrie.autocomplete(req.query.q);
    console.log("Autocomplete response: ", result)
    res.send(result);
    return next();
};
