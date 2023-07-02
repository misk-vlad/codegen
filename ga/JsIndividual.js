import esprima from 'esprima';
import estraverse from 'estraverse';
import escodegen from 'escodegen';

import GenericIndividual from "./GenericIndividual.js";
import JsMutations from "./JsMutations.js";

class JsIndividual extends GenericIndividual {
  constructor(body = 'function sum() {}') {
    super(body);
    this.mutations = JsMutations.mutations;
  }

  chooseMutation(node) {
    if (node.type in this.mutations) {
      if (Math.random() <= 0.1) {
        console.log(`Performing ${this.mutations[node.type]} mutation for ${node.type}...`);
        let mutationsList = this.mutations[node.type];
        let chosenMutation = mutationsList[Math.floor(Math.random() * mutationsList.length)];
        chosenMutation(node);
      }
    }
  }

  mutated_clone() {
    let tree = esprima.parseScript(this.body);
    let replaced = estraverse.replace(tree, {
      enter: this.chooseMutation.bind(this)
    })
    let output = escodegen.generate(replaced);
    return new JsIndividual(output);
  }

  fitness() {
    let sum = eval(this.body);
    let result = sum(1,2);
    return result === 3;
  }
}

let jsInd = new JsIndividual();
console.log(jsInd.toString());
let out = jsInd.mutated_clone();
console.log(out);
console.log(out.fitness());

export default JsIndividual;