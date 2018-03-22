"use strict";
let { CanonicalTrie } = require("../pando.js");

module.exports = function search(req, res, next) {
    console.log(req.query)
    let result = CanonicalTrie.search(req.query.q);

    res.send(result);
    return next();
};
