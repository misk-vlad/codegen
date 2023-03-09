const esprima = require('esprima');
const pyjs = require('pyjs');


const jsCode = `
  function add(a, b) {
    return a + b;
  }

  console.log(add(2, 3));
`;


const ast = esprima.parse(jsCode);


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
  } else {
    throw new Error(`Unsupported node type: ${node.type}`);
  }
}


const generatedPythonCode = generatePythonCode(ast);
console.log(generatedPythonCode);

