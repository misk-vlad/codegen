let population = []
const POPULATION_VOLUME = 500
const INITIAL_INDIVIDUAL = "ACTGACTGACTGACTG"
const GENES = ['A', 'C', 'T', 'G']

function init() {
  for (let i = 0; i < POPULATION_VOLUME; i++) {
    population.push(INITIAL_INDIVIDUAL)
  }
}

function mutation() {
  console.log('Executing mutation...')
  let mutated_population = []
  
  for (let i = 0; i < population.length; i++) {
    let mutated_individual = population[i]
    
    let mutated_gene = Math.floor(Math.random() * mutated_individual.length)
    let mutation_value = GENES[Math.floor(Math.random() * GENES.length)]
    mutated_individual[mutated_gene] = mutation_value
    
    mutated_population.push(mutated_individual)
  }

  for (let i = 0; i < mutated_population.length; i++) {
    population.push(mutated_population[i])
  }

  console.log(`Population after mutation: ${population.length}`)
}

function fitness(individual) {
  let A_count = individual.split('A').length - 1
  return A_count / individual.length
}

function crossover() {
  console.log('Executing crossover...')
}

function selection() {
  console.log('Executing selection...')
}

function iteration(epoch) {
  console.log(`Starting iteration ${epoch}...`)
  mutation()
  crossover()
  selection()
  console.log(`Finished iteration ${epoch}.`)
}

function loop(iterations) {
  for (let i = 0; i < iterations; i++) {
    iteration(i)
  }
}

function main() {
  console.log('Hello there! This is genetic alghorithm demo.')
  loop(5)
}

main()
