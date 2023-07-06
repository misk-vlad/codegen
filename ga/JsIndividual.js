import esprima from 'esprima';
import estraverse from 'estraverse';
import escodegen from 'escodegen';
import esquery from 'esquery';
import debug from 'debug';

const mLogger = debug('JsIndividual:mutation');
const fLogger = debug('JsIndividual:fitness');
const cLogger = debug('JsIndividual:cross');
const eLogger = debug('JsIndividual:exec');

import GenericIndividual from "./GenericIndividual.js";
import JsMutations from "./JsMutations.js";
import JsTest from "./JsTest.js";

class JsIndividual extends GenericIndividual {
  constructor(body = 'function sum(a, b) {}') {
    super(body);
    this.mutations = JsMutations.mutations;
  }

  chooseMutation(node) {
    if (node.type in this.mutations) {
      if (Math.random() <= 0.99) {
        let mutationsList = this.mutations[node.type];
        let chosenMutation = mutationsList[Math.floor(Math.random() * mutationsList.length)];
        mLogger(`Performing ${chosenMutation} mutation for ${node.type}...`);
        chosenMutation(node);
        mLogger(`node after mutation: ${JSON.stringify(node)}`);
      }
    }
  }

  mutated_clone() {
    mLogger(`parsing ${this.body}`);
    let tree = esprima.parseScript(this.body);
    let replaced = estraverse.replace(tree, {
      enter: this.chooseMutation.bind(this)
    })
    let output = escodegen.generate(replaced);
    return new JsIndividual(output);
  }

  cross(anotherIndividual) {
    let myTree = esprima.parseScript(this.body);
    let myBodyLeaf = esquery(myTree, 'FunctionDeclaration>BlockStatement')[0];
    let myBodyLength = myBodyLeaf.body.length;
    cLogger(`first parent body is: ${JSON.stringify(myBodyLeaf,0,4)}`);
    cLogger(`first parent body length is: ${myBodyLength}`);
    let anotherTree = esprima.parseScript(anotherIndividual.body);
    let anotherBodyLeaf = esquery(anotherTree, 'FunctionDeclaration>BlockStatement')[0];
    let anotherBodyLength = anotherBodyLeaf.body.length;
    cLogger(`second parent body is: ${JSON.stringify(anotherBodyLeaf,0,4)}`);
    cLogger(`second parent body length is: ${anotherBodyLength}`);
    let bodyLengthDiff = Math.abs(myBodyLength - anotherBodyLength);
    let childBodyLength = Math.min(myBodyLength, anotherBodyLength) + Math.round(Math.random() * bodyLengthDiff);
    cLogger(`child body length is: ${childBodyLength}`);
    let childTree = {type:"BlockStatement",body:[]};
    let donor = null;
    cLogger('started filling min length...');
    for (let i = 0; i < Math.min(myBodyLength, anotherBodyLength); i++) {
      if (Math.random() <= 0.5) {
        donor = myBodyLeaf;
      } else {
        donor = anotherBodyLeaf;
      }
      childTree.body.push(donor.body[i]);
    }
    cLogger('started filling to max length...');
    donor = (myBodyLength > anotherBodyLength) ? myBodyLeaf : anotherBodyLeaf;
    for(let i = Math.min(myBodyLength, anotherBodyLength); i < childBodyLength; i++) {
      childTree.body.push(donor.body[i]);
    }
    cLogger(`child body is: ${JSON.stringify(childTree)}`);
    let wrapper = { 
      type: 'FunctionDeclaration', 
      id: { type: 'Identifier', name: 'sum' }, 
      params: [
        { type: 'Identifier', name: 'a' },
        { type: 'Identifier', name: 'b' }
      ], 
      body: childTree, 
      generator: false, 
      expression: false, 
      async: false 
    };
    let output = escodegen.generate(wrapper);
    cLogger(`child output is: ${output}`);
    return new JsIndividual(output);
  }

  getBody() {
    let tree = esprima.parseScript(this.body);
    let bodyLeaf = esquery(tree, 'FunctionDeclaration>BlockStatement')[0];
    eLogger(`esquery result: ${JSON.stringify(bodyLeaf)}`);
    let body = escodegen.generate(bodyLeaf);

    return body;
  }

  exec() {
    let body = this.getBody();
    let f = Function('a', 'b', body);
    let result = f(...arguments);
    return result;
  }

  fitness() {
    let test = new JsTest(this);
    fLogger(`this is test: ${test}, type: ${typeof test}`);
    let result = test.run();
    fLogger(`fitness for\n === \n ${this.body} \n === \n is ${result}`);
    return result;
  }
}

let jsInd = new JsIndividual();
console.log(jsInd.toString());
let out = jsInd.mutated_clone();
console.log(out);
console.log(out.fitness());
let child = jsInd.cross(out);
console.log(child.toString());

export default JsIndividual;
