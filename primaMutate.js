const fs = require('fs');


const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');



module.exports = async function SynthThree (path = './InputCode.js') {
    try {
        const script = fs.readFileSync(path, 'utf8');
        return esprima.parseScript(script);
      } catch (err) {
        console.error("cano read file "+ err)
        return {}
      }
} 








