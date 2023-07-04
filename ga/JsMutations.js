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

class JsMutations {
  static mutations = {
    /*FunctionDeclaration: [ 
      mutationAddParameter 
    ],*/
    BlockStatement: [ 
      mutationAddReturnStatement,
      mutationAddVariableDeclaration
    ],
    VariableDeclarator: [
      mutationAddVariableDeclarationInit
    ]
  }
}

export default JsMutations;
