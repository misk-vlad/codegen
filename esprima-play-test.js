const esprima = require('esprima');

let parsed = esprima.parseScript('answer = 53');
console.log(JSON.stringify(parsed, 0, 4))
