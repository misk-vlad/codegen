const fs = require('fs');
const esprima = require('esprima');
const pyjs = require('pyjs');

// Read in the JavaScript file
const jsCode = fs.readFileSync('example.js', 'utf-8');

// Parse the JavaScript code into an AST
const jsAst = esprima.parseScript(jsCode);

// Convert the JavaScript AST to a Python AST
const pythonAst = {
  type: 'Module',
  body: jsAst.body.map(convertNode)
};

function convertNode(node) {
  // Map JavaScript node types to Python node types
  switch (node.type) {
    case 'VariableDeclaration':
      return {
        type: 'Assign',
        targets: node.declarations.map(d => ({
          type: 'Name',
          id: { type: 'Identifier', name: d.id.name },
          ctx: { type: 'Store' }
        })),
        value: convertNode(node.declarations[0].init)
      };
    case 'CallExpression':
      return {
        type: 'Expr',
        value: {
          type: 'Call',
          func: { type: 'Name', id: node.callee.name, ctx: { type: 'Load' } },
          args: node.arguments.map(convertNode),
          keywords: []
        }
      };
    case 'Literal':
      return { type: 'Str', s: node.value.toString() };
    case 'Identifier':
      return { type: 'Name', id: { type: 'Identifier', name: node.name }, ctx: { type: 'Load' } };
    // Handle other node types as needed
    default:
      throw new Error(`Unsupported node type: ${node.type}`);
  }
}

// Generate Python code from the Python AST
const pythonCode = pyjs(pythonAst);

console.log(pythonCode);

