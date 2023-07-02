import Population from "./Population.js";
// import TestIndividual from "./TestIndividual.js";
import GenomeIndividual from "./GenomeIndividual.js";

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
    console.log(`Starting iteration ${epoch}...`);
    console.log(`Population before mutation: ${this.population.toString()}`);
    this.mutation();
    console.log(`Population after mutation: ${this.population.toString()}`);
    this.crossover();
    this.selection();
    console.log(`Finished iteration ${epoch}...`)
    console.log(`Population size is: ${this.population.actualSize}`);
  }

  loop(iterations) {
    for (let i = 0; i < iterations; i++) {
      this.iteration(i);
    }
  }
}

let ga = new GeneticAlghorithm(10, GenomeIndividual);
ga.init();
ga.loop(40);

export default GeneticAlghorithm;