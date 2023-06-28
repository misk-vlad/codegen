import GenericIndividual from "./GenericIndividual.js";

const GENES = ['A', 'C', 'T', 'G'];

function mutationFunction(individual) {
  let mutated_gene = Math.floor(Math.random() * individual.length);
  let mutation_value = GENES[Math.floor(Math.random() * GENES.length)];
  let mutated_individual = individual.substring(0, mutated_gene) + mutation_value + individual.substring(mutated_gene + 1);
  
  return mutated_individual;
}

class GenomeIndividual extends GenericIndividual {
  constructor() {
    super('ACTGACTGACTGACTG');
    this.mutations = [ mutationFunction ];
  }

  mutate() {
    let mutationIndex = Math.floor(Math.random() * this.mutations.length);
    this.body = this.mutations[mutationIndex](this.body);
  }

  mutated_clone() {
    let mutationIndex = Math.floor(Math.random() * this.mutations.length);
    return this.mutations[mutationIndex](this.body);
  }
}

let genome = new GenomeIndividual();
let mutated = genome.mutated_clone();
console.log(mutated);

export default GenomeIndividual;