class GeneticAlghorithm {
  constructor() {
    this.initialIndividual = '';
    this.populationVolume = 10;
    this.population = [];
    this.mutations = [];
  }

  initPopulation() {
    console.log('initializing population...')
    for (let i = 0; i < this.populationVolume; i++) {
      this.population.push(this.initialIndividual);
    }
  }

  mutation() {
    console.log('executing mutation...');
    
  }
}

export default GeneticAlghorithm;