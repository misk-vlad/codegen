import template from './addVariableDeclarationInit.json' assert { type: 'json' };
import Helpers from './helpers.js';
import Handlebars from 'handlebars';

for (const key of Object.keys(Helpers)) {
  console.log(`Registering ${key} as Handlebars helper...`);
  Handlebars.registerHelper(key, Helpers[key]);
}

console.log(template);

const compiler = Handlebars.compile(JSON.stringify(template,0,4));
console.log(compiler({ 
  variableName: 'Vasya',
  variableScope: ['a','b'],
  variableToExclude: 'c'
}));