import escope from 'escope';
import esquery from 'esquery';
import esprima from 'esprima';
import escodegen from 'escodegen';
import debug from 'debug';

const mLogger = debug('JsMutations2');

function mutationAddVariableDeclaration(tree) { // in: ast tree
  let scopeManager = escope.analyze(tree);
  let currentScope = scopeManager.acquire(tree);
  let variableScope = currentScope.childScopes[0].variables.filter(e => e.name !== 'arguments').map(e => e.name);
  // mLogger(variableScope);
  let variableName = generateVariableName(variableScope);
  // mLogger(variableName);
  let bodyLeaf = esquery(tree, 'FunctionDeclaration>BlockStatement')[0];
  bodyLeaf.body.unshift({
    type: "VariableDeclaration",
    declarations: [
        {
            type: "VariableDeclarator",
            id: {
                type: "Identifier",
                name: variableName
            },
            init: null
        }
    ],
    kind: "let"
  });
  // let scriptSource = escodegen.generate(tree);
  // mLogger(scriptSource);
} 

function mutationAddReturnStatement(tree) { // in: ast tree
  let scopeManager = escope.analyze(tree);
  let currentScope = scopeManager.acquire(tree);
  let variableScope = currentScope.childScopes[0].variables.filter(e => e.name !== 'arguments').map(e => e.name);
  // mLogger(variableScope);
  let variableName = variableScope[Math.floor(Math.random() * variableScope.length)];
  // mLogger(variableName);
  let bodyLeaf = esquery(tree, 'FunctionDeclaration>BlockStatement')[0];
  bodyLeaf.body.push({
    type: 'ReturnStatement',
    argument: {
      type: 'Identifier',
      name: variableName
    }
  });
  // let scriptSource = escodegen.generate(tree);
  // mLogger(scriptSource);
}

function mutationAddVariableDeclarationInit(tree) {
  let scopeManager = escope.analyze(tree);
  let currentScope = scopeManager.acquire(tree);
  let variableScope = currentScope.childScopes[0].variables.filter(e => e.name !== 'arguments').map(e => e.name);
  // mLogger(variableScope);
  // let variableName1 = variableScope[Math.floor(Math.random() * variableScope.length)];
  // let variableName2 = variableScope[Math.floor(Math.random() * variableScope.length)];
  // mLogger(variableName);
  let bodyLeaf = esquery(tree, 'FunctionDeclaration VariableDeclarator')[0];
  mLogger(`found bodyLeaf ${JSON.stringify(bodyLeaf)}`);

  if (bodyLeaf === undefined) 
    return;

  let variableToExclude = bodyLeaf.id.name;
  mLogger(`excluding ${variableToExclude}...`);

  bodyLeaf.init = {
    type: 'BinaryExpression',
    operator: randomBinaryOperator(),
    left: {
      type: 'Identifier',
      name: chooseVariableName(variableScope, variableToExclude)
    },
    right: {
      type: 'Identifier',
      name: chooseVariableName(variableScope, variableToExclude)
    }
  }

  // bodyLeaf.body.push({
  //   type: 'ReturnStatement',
  //   argument: {
  //     type: 'Identifier',
  //     name: variableName
  //   }
  // });
  // let scriptSource = escodegen.generate(tree);
  // mLogger(scriptSource);
}

function generateVariableName(variableScope) {
  const identifierDictionary = 'abcdefghijklmopqrstuvwxyz';

  function randomIdentifier() {
    return identifierDictionary[Math.floor(Math.random() * identifierDictionary.length)];
  }

  let identifier;

  do {
    identifier = randomIdentifier();
    mLogger(`Generated variable: ${identifier}`);
  } while (variableScope.includes(identifier));

  return identifier;
}

function chooseVariableName(scope, exclude) {
  let identifier;
  do {
    identifier = scope[Math.floor(Math.random() * scope.length)];
    mLogger(`Chosen variable: ${identifier}`);
  } while (identifier === exclude);

  return identifier;
}

const operatorDictionary = '+-*/';
function randomBinaryOperator() {
  return operatorDictionary[Math.floor(Math.random() * operatorDictionary.length)];
}

class JsMutations {
  static mutations = [
    mutationAddVariableDeclaration,
    mutationAddReturnStatement,
    mutationAddVariableDeclarationInit
  ]
}

let tree = esprima.parseScript('function sum(a,b) { let c; return c };');
// let scopeManager = escope.analyze(tree);
// let currentScope = scopeManager.acquire(tree);
// let variableScope = currentScope.childScopes[0].variables.filter(e => e.name !== 'arguments').map(e => e.name);
// mLogger(variableScope);
// let variableName = generateVariableName(variableScope);
// mLogger(variableName);
// let bodyLeaf = esquery(tree, 'FunctionDeclaration>BlockStatement')[0];
// bodyLeaf.body.unshift({
//   type: "VariableDeclaration",
//   declarations: [
//       {
//           type: "VariableDeclarator",
//           id: {
//               type: "Identifier",
//               name: variableName
//           },
//           init: null
//       }
//   ],
//   kind: "let"
// });
// mutationAddVariableDeclaration(tree);
mutationAddVariableDeclarationInit(tree);
let scriptSource = escodegen.generate(tree);
mLogger(scriptSource);

export default JsMutations;
