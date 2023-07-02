import GenericIndividual from "./GenericIndividual.js";
import GenomeMutations from './GenomeMutations.js';

class GenomeIndividual extends GenericIndividual {
  constructor(body = 'ACTGACTGACTGACTG') {
    super(body);
    this.mutations = GenomeMutations.mutations;
  }

  mutate() {
    let mutationIndex = Math.floor(Math.random() * this.mutations.length);
    this.body = this.mutations[mutationIndex](this.body);
  }

  mutated_clone() {
    let mutationIndex = Math.floor(Math.random() * this.mutations.length);
    let mutatedBody = this.mutations[mutationIndex](this.body);
    return new GenomeIndividual(mutatedBody);
  }

  fitness() {
    let A_count = this.body.split('A').length - 1
    return A_count / this.body.length
  }

  crossover(anotherIndividual) {
    let children = '';

    for (let i = 0; i < anotherIndividual.body.length; i++) {
      if (Math.random() < 0.5) {
        children += anotherIndividual.body[i];
      } else {
        children += this.body[i];
      }
    }

    return new GenomeIndividual(children);
  }

}

// let genome = new GenomeIndividual();
// let mutated = genome.mutated_clone();
// console.log(mutated);

export default GenomeIndividual;