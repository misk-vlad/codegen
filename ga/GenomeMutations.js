const GENES = ['A', 'C', 'T', 'G'];

function mutationFunction(individual) {
  // console.log('this is mutation function from GenomeMutations.js')
  let mutated_gene = Math.floor(Math.random() * individual.length);
  let mutation_value = GENES[Math.floor(Math.random() * GENES.length)];
  let mutated_individual = individual.substring(0, mutated_gene) + mutation_value + individual.substring(mutated_gene + 1);
  
  return mutated_individual;
}

class GenomeMutations {
  static mutations = [
    mutationFunction
  ]
}

export default GenomeMutations;