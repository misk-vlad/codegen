// import JsIndividual from "./JsIndividual.js";
import GenomeIndividual from "./GenomeIndividual.js";

class Population {
	constructor(size, IndividualClass) {
		this._size = size;
		this.population = [];
    this.IndividualClass = IndividualClass;
	}

  get actualSize() {
    return this.population.length;
  }

	init() {
		console.log('Initializing population...');
		for (let i = 0; i < this._size; i++) {
      let individual = new this.IndividualClass();
			this.population.push(individual);
		}
	}

  toString() {
    return this.population.map(e => e.toString()).join('\n');
  }

  mutate() {
    console.log('Executing mutation...')
    for (let i = 0; i < this.actualSize; i++) {
      this.population[i].mutate();
    }
  }

  mutated_clones() {
    console.log('Creating mutated clones...');
    let mutated_population = [];

    for (let i = 0; i < this.actualSize; i++) {
      let mutated_clone = this.population[i].mutated_clone();
      mutated_population.push(mutated_clone);
    }

    for (let i = 0; i < mutated_population.length; i++) {
      this.population.push(mutated_population[i]);
    }
  }

  crossover() {
    console.log('Executing crossover...');
    this.population.sort((a, b) => b.fitness() - a.fitness());

    let children = [];

    // TODO: add X best & Y worst
    for (let i = 0; i < this.population.length; i += 2) {
      let firstParent = this.population[i];
      let secondParent = this.population[i+1];
      let child = firstParent.crossover(secondParent);

      children.push(child);
    }

    for (let i = 0; i < children.length; i++) {
      this.population.push(children[i]);
    }

    console.log(`new population length: ${this.actualSize}`)
  }

  selection() {
    console.log('Executing selection...');
    this.population.sort((a, b) => b.fitness() - a.fitness());
    this.population = this.population.slice(0, this._size);
    console.log(`new population length: ${this.actualSize}`);
  }

}

// let p = new Population(10, GenomeIndividual);
// p.init();
// console.log(p.toString());
// p.mutated_clones();
// console.log(p.toString());
// p.crossover();
// console.log(p.toString());
// p.selection();
// console.log(p.toString());

export default Population;