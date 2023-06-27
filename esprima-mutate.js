const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');

let tree = esprima.parseScript('function sum() { }');
console.log(JSON.stringify(tree, 0, 4));

// estraverse.traverse(tree, {
//     enter: function (node, parent) {
//         console.log('enter node ', node.type, Object.keys(node));
//         if (parent)
//             console.log('enter parent ', parent.type, Object.keys(parent));
//     },
//     leave: function (node, parent) {
//         console.log('leave node', node.type, Object.keys(node));
//         if (parent)
//             console.log('leave parent ', parent.type, Object.keys(parent));
//     }
// })

const identifierDictionary = 'abcdefghijklmopqrstuvwxyz';
function randomIdentifier() {
  return identifierDictionary[Math.floor(Math.random() * identifierDictionary.length)];
}

const operatorDictionary = '+-*/';
function randomBinaryOperator() {
  return operatorDictionary[Math.floor(Math.random() * operatorDictionary.length)];
}

function mutationAddParameter(node) {
  node.params.push({
    type: 'Identifier',
    name: randomIdentifier()
  })
  return node;
}

function mutationAddReturnStatement(node) {
  node.body.push({
    type: 'ReturnStatement',
    argument: {
      type: 'Identifier',
      name: randomIdentifier()
    }
  })
  return node;
}

function mutationAddBinaryExpression(node) {
  node.argument = {
    type: 'BinaryExpression',
    operator: randomBinaryOperator(),
    left: {
      type: 'Identifier',
      name: node.argument.name ?? randomIdentifier()
    },
    right: {
      type: 'Identifier',
      name: randomIdentifier()
    }
  }
  return node;
}

function mutationAddExpressionStatement(node) {
  node.body.push({
    type: 'ExpressionStatement',
    expression: {
      type: 'Identifier',
      name: randomIdentifier()
    }
  })

  return node;
}

function mutateIdentifierToAssignmentExpression(node) {
  let result = {
    type: 'AssignmentExpression',
    operator: '=',
    left: node,
    right: {
      type: 'Literal',
      value: 1,
      raw: '1'
    }
  }
  return result;
}

function mutationAddVariableDeclaration(node) {
  node.body.push({
    type: "VariableDeclaration",
    declarations: [
        {
            type: "VariableDeclarator",
            id: {
                type: "Identifier",
                name: randomIdentifier()
            },
            init: null
        }
    ],
    kind: "let"
  })
  return node;
}

function mutationAddVariableDeclarationInit(node) {
  node.init = {
    type: 'BinaryExpression',
    operator: randomBinaryOperator(),
    left: {
      type: 'Identifier',
      name: randomIdentifier()
    },
    right: {
      type: 'Identifier',
      name: randomIdentifier()
    }
  }
  return node;
}

function chooseMutation(node, parent) {
  if (node.type === 'FunctionDeclaration') {
    if (Math.random() <= 0.1)
      return mutationAddParameter(node);
  }
  if (node.type === 'BlockStatement') {
    if (Math.random() <= 0.1)
      return mutationAddReturnStatement(node);
    // else if (Math.random() <= 0.1)
    //   return mutationAddExpressionStatement(node);
    else if (Math.random() <= 0.1)
      return mutationAddVariableDeclaration(node);
  }
  if (node.type === 'VariableDeclarator' && node.init === null) {
    if (Math.random() <= 0.1)
      return mutationAddVariableDeclarationInit(node);
  }
  // if (node.type === 'ReturnStatement') {
  //   if (Math.random() <= 0.1)
  //     return mutationAddBinaryExpression(node);
  // }
  // if (node.type === 'Identifier' && parent.type !== 'FunctionDeclaration') {
  //   if (Math.random() <= 0.1)
  //     return mutateIdentifierToAssignmentExpression(node);
  // }
  // if (node.type === 'Literal') {
  //     let { type, value, raw } = node;
  //     return { type, value: 2, raw };
  // }
}

let replaced = estraverse.replace(tree, {
    enter: chooseMutation
})

for (let i = 0; i <= 100; i++) {
  replaced = estraverse.replace(replaced, {
    enter: chooseMutation
  })
}

console.log(JSON.stringify(replaced, 0, 4));

let output = escodegen.generate(replaced);
console.log(output);

