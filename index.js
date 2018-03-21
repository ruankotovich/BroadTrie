let canonicalTrie = null;

// Load the precompiled binary for windows.
if (process.platform === "win32" && process.arch === "x64") {
    canonicalTrie = require('./bin/winx64/canonicalTrie');
} else if (process.platform === "win32" && process.arch === "ia32") {
    canonicalTrie = require('./bin/winx86/canonicalTrie');
} else {
    // Load the new built binary for other platforms.
    canonicalTrie = require('./build/Release/canonicalTrie');
    console.log(__dirname);
}

canonicalTrie.buildCharmap(`${__dirname}/charmap.cm`);
console.log("Loading charmap on " + `${__dirname}/charmap.cm`);

// canonicalTrie.emplace("i love russian girls", "Warmup");
// canonicalTrie.emplace("they're always so lovely", "test");
// canonicalTrie.emplace("they're so confident", "has");
// canonicalTrie.emplace("but all I am belongs to Mira", "been");
// canonicalTrie.emplace("so do you", "performed");
// console.log(canonicalTrie.search("i love russian girls"));
// console.log(canonicalTrie.search("they're always so lovely"));
// console.log(canonicalTrie.search("they're so confident"));
// console.log(canonicalTrie.search("but all I am belongs to Mira"));
// console.log(canonicalTrie.search("they're so confident"));
// console.log(canonicalTrie.search("so do you"));

/*=============== METÓDOS PÚBLICOS DO MÓDULO ==================*/

let CanonicalTrie = {
    search: (key) => {
        let outputPreprocessed = canonicalTrie.search(key);
        if (outputPreprocessed.object) {
            return JSON.parse(outputPreprocessed.object);
        } else {
            return undefined;
        }
    },
    emplace: (key, value) => {
        return canonicalTrie.emplace(key, typeof(value) === "object" ? JSON.stringify(value) : value);
    }
};

module.exports.CanonicalTrie = CanonicalTrie;
