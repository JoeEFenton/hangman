const fs = require('fs');

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").split("\n");

let randWord = words[Math.floor(Math.random() * words.length)];
