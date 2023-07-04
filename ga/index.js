import debug from 'debug';

const logger = debug('GeneticAlghorithm');

import Population from "./Population.js";
// import TestIndividual from "./TestIndividual.js";
// import GenomeIndividual from "./GenomeIndividual.js";
import JsIndividual from "./JsIndividual.js";

class GeneticAlghorithm {
  constructor(populationSize, IndividualClass) {
    this.population = new Population(populationSize, IndividualClass);
  }

  init() {
    this.population.init();
  }

  mutation() {
    this.population.mutated_clones();
  }

  crossover() {
    this.population.crossover();
  }

  selection() {
    this.population.selection();
  }

  iteration(epoch) {
    logger(`Starting iteration ${epoch}...`);
    logger(`Population before mutation: ${this.population.toString()}`);
    this.mutation();
    logger(`Population after mutation \n ===: \n ${this.population.toString()}`);
    this.crossover();
    this.selection();
    logger(`Finished iteration ${epoch}...`)
    logger(`Population size is: ${this.population.actualSize}`);
  }

  loop(iterations) {
    for (let i = 0; i < iterations; i++) {
      this.iteration(i);
    }
  }
}

let ga = new GeneticAlghorithm(100, JsIndividual);
ga.init();
ga.loop(10);

export default GeneticAlghorithm;
