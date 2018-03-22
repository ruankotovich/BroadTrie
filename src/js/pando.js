let canonicalTrie = null;

// Load the precompiled binary for windows.
if (process.platform === "win32" && process.arch === "x64") {
    canonicalTrie = require('../../bin/winx64/canonicalTrie');
} else if (process.platform === "win32" && process.arch === "ia32") {
    canonicalTrie = require('../../bin/winx86/canonicalTrie');
} else {
    // Load the new built binary for other platforms.
    canonicalTrie = require('../../build/Release/canonicalTrie');
}
let dirname =  process.cwd();
canonicalTrie.buildCharmap(`${dirname}/charmap.cm`);
console.log("Loading charmap on " + `${dirname}/charmap.cm`);

/*=============== METÓDOS PÚBLICOS DO MÓDULO ==================*/

let CanonicalTrie = {
    search: (key) => {
        let outputPreprocessed = canonicalTrie.search(key);
        if (outputPreprocessed.object) {
            let bolacha =  outputPreprocessed.object;
            console.log(bolacha);
            console.log(JSON.parse(bolacha));
            return JSON.parse(bolacha);
        } else {
            return undefined;
        }
    },
    emplace: (key, value) => {
        try{
            canonicalTrie.emplace(key, typeof(value) === "object" ? JSON.stringify(value) : String(value));
            return true;
        }
        catch(error){
            return false;
        }
    }
};

module.exports.CanonicalTrie = CanonicalTrie;
