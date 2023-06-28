import GenericIndividual from "./GenericIndividual.js";

class TestIndividual extends GenericIndividual {
  constructor(body, mutations) {
    super('AAA');
    this.mutations = [ () => 'BBB' ];
  }

  mutate() {
    let mutationIndex = Math.floor(Math.random() * this.mutations.length);
    this.body = this.mutations[mutationIndex](this.body);
  }
}

// let jsCode = new JsIndividual('AAA', [ body => 'BBB' ]);
// jsCode.mutate();
// console.log(jsCode.toString());

export default TestIndividual;