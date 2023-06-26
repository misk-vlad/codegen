const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');

let tree = esprima.parseScript('function sum(a,b) { return a+b; }');
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

function generatePythonCode(node) {
  if (node.type === 'Program') {
    return node.body.map(generatePythonCode).join('\n');
  } else if (node.type === 'FunctionDeclaration') {
    const functionName = node.id.name;
    const args = node.params.map((param) => param.name).join(', ');
    const body = generatePythonCode(node.body);
    return `def ${functionName}(${args}):\n${body}`;
  } else if (node.type === 'ReturnStatement') {
    const value = generatePythonCode(node.argument);
    return `return ${value}`;
  } else if (node.type === 'BinaryExpression') {
    const left = generatePythonCode(node.left);
    const right = generatePythonCode(node.right);
    return `(${left} ${node.operator} ${right})`;
  } else if (node.type === 'CallExpression') {
    const callee = generatePythonCode(node.callee);
    const args = node.arguments.map(generatePythonCode).join(', ');
    return `${callee}(${args})`;
  } else if (node.type === 'Literal') {
    return node.raw;
  } else if (node.type === 'Identifier') {
    return node.name;
  } else if (node.type === 'VariableDeclaration') {
    return generatePythonCode(node.declarations[0]);
  } else if (node.type === 'VariableDeclarator') {
    return `${node.id.name} = ${node.init.value} `;
  } else if (node.type === 'BlockStatement') {
    return `    ${generatePythonCode(node.body[0])}`;
  } else {
    throw new Error(`Unsupported node type: ${node.type}`);
  }
}

let pythonCode = generatePythonCode(tree);
console.log(pythonCode);
