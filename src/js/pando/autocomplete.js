"use strict";
let { CanonicalTrie } = require("../pando.js");

module.exports = function autocomplete(req, res, next) {
    console.log(req.query)
    let result = CanonicalTrie.autocomplete(req.query.q);

    res.send(result);
    return next();
};
