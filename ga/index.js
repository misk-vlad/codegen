class GeneticAlghorithm {
  constructor() {
    this.populationParameters = {
      initialVolume: 10,
      maxVolume: 500,
      initialIndividual: ''
    }
    this.population = [];
    this.mutationParameters = {
      probability: 1.0,
    }
    this.implementations = {
      mutate: function (individual) { 
        return individual;
      },
    };
  }

  initPopulation() {
    console.log('initializing population...')
    for (let i = 0; i < this.populationVolume; i++) {
      this.population.push(this.initialIndividual);
    }
  }

  mutation() {
    console.log('executing mutation...');
    let mutated_population = [];

    for (let i = 0; i < this.population.length; i++) {
      if (Math.random() >= this.mutationParameters.probability) continue;

      let mutant = this.implementations.mutate(this.population[i]);
      mutated_population.push(mutant);
    }

    for (let i = 0; i < mutated_population.length; i++) {
      this.population.push(mutated_population[i]);
    }
  }

  iteration(epoch) {
    console.log(`Starting iteration ${epoch}...`);
    this.mutation();
    this.crossover();
    this.selection();
    console.log(`Finished iteration ${epoch}...`)
  }

  loop(iterations) {
    for (let i = 0; i < iterations; i++) {
      this.iteration(i);
    }
  }
}

export default GeneticAlghorithm;