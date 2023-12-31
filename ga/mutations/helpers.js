import debug from 'debug';
const hLogger = debug('mutations:helpers');

function generateVariableName(variableScope) {
  const identifierDictionary = 'abcdefghijklmopqrstuvwxyz';

  function randomIdentifier() {
    return identifierDictionary[Math.floor(Math.random() * identifierDictionary.length)];
  }

  let identifier;

  do {
    identifier = randomIdentifier();
    hLogger(`Generated variable: ${identifier}`);
  } while (variableScope.includes(identifier));

  return identifier;
}

function chooseVariableName(scope, exclude) {
  let identifier;
  do {
    identifier = scope[Math.floor(Math.random() * scope.length)];
    hLogger(`Chosen variable: ${identifier}`);
  } while (identifier === exclude);

  return identifier;
}

const operatorDictionary = '+-*/';
function randomBinaryOperator() {
  return operatorDictionary[Math.floor(Math.random() * operatorDictionary.length)];
}

export default {
  generateVariableName,
  chooseVariableName,
  randomBinaryOperator
}