import debug from 'debug';

const logger = debug('Population');

import JsIndividual from "./JsIndividual.js";
// import GenomeIndividual from "./GenomeIndividual.js";

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
    logger('Initializing population...');
    for (let i = 0; i < this._size; i++) {
      let individual = new this.IndividualClass();
      this.population.push(individual);
    }
  }

  toString() {
    return this.population.map(e => e.toString()).join('\n');
  }

  mutate() {
    logger('Executing mutation...')
    for (let i = 0; i < this.actualSize; i++) {
      this.population[i].mutate();
    }
  }

  mutated_clones() {
    logger('Creating mutated clones...');
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
    logger('Executing crossover...');
    this.population.sort((a, b) => b.fitness() - a.fitness());

    let children = [];

    // TODO: add X best & Y worst
    for (let i = 0; i < this.population.length; i += 2) {
      let firstParent = this.population[i];
      let secondParent = this.population[i+1];
      let child = firstParent.cross(secondParent);

      children.push(child);
    }

    for (let i = 0; i < children.length; i++) {
      this.population.push(children[i]);
    }

    logger(`new population length: ${this.actualSize}`)
  }

  selection() {
    logger('Executing selection...');
    this.population.sort((a, b) => b.fitness() - a.fitness());
    this.population = this.population.slice(0, this._size);
    logger(`new population length: ${this.actualSize}`);
    logger('new population:');
    for (let i = 0; i < this.population.length; i++) {
      logger(this.population[i].toString());
    }
  }

}

// let p = new Population(10, GenomeIndividual); JsIndividual
let p = new Population(10, JsIndividual); 
p.init();
console.log(p.toString());
p.mutated_clones();
console.log(p.toString());
p.crossover();
console.log(p.toString());
p.selection();
console.log(p.toString());

export default Population;
