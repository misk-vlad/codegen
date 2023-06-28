// import JsIndividual from "./JsIndividual.js";

class Population {
	constructor(size, IndividualClass) {
		this.size = size;
		this.population = [];
    this.IndividualClass = IndividualClass;
	}

	init() {
		console.log('Initializing population...');
		for (let i = 0; i < this.size; i++) {
      let individual = new this.IndividualClass();
			this.population.push(individual);
		}
	}

  toString() {
    return this.population.map(e => e.toString()).join('\n');
  }

  mutate() {
    console.log('Executing mutation...')
    for (let i = 0; i < this.size; i++) {
      this.population[i].mutate();
    }
  }

}

// let p = new Population(10, JsIndividual);
// p.init();
// console.log(p.toString());
// p.mutate();
// console.log(p.toString());

export default Population;