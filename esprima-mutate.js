const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');

let tree = esprima.parseScript('let a = 1;');
console.log(JSON.stringify(tree, 0, 4));

estraverse.traverse(tree, {
    enter: function (node, parent) {
        console.log('enter node ', node.type, Object.keys(node));
        if (parent)
            console.log('enter parent ', parent.type, Object.keys(parent));
    },
    leave: function (node, parent) {
        console.log('leave node', node.type, Object.keys(node));
        if (parent)
            console.log('leave parent ', parent.type, Object.keys(parent));
    }
})

let replaced = estraverse.replace(tree, {
    enter: function (node, parent) {
        if (node.type === 'Literal') {
            let { type, value, raw } = node;
            return { type, value: 2, raw };
        }
    }
})

console.log(JSON.stringify(replaced, 0, 4));

let output = escodegen.generate(replaced);
console.log(output);