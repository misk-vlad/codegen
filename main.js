let population = []
const POPULATION_VOLUME = 10
const INITIAL_INDIVIDUAL = "ACTGACTGACTGACTG"
const GENES = ['A', 'C', 'T', 'G']

function init() {
  console.log('initializing population...')
  for (let i = 0; i < POPULATION_VOLUME; i++) {
    population.push(INITIAL_INDIVIDUAL)
  }
}

function mutation() {
  console.log('Executing mutation...')
  let mutated_population = []
  
  for (let i = 0; i < population.length; i++) {
    let mutated_gene = Math.floor(Math.random() * population[i].length)
    let mutation_value = GENES[Math.floor(Math.random() * GENES.length)]
    let mutated_individual = population[i].substring(0, mutated_gene) + mutation_value + population[i].substring(mutated_gene + 1)
    
    mutated_population.push(mutated_individual)
    console.log(`${population[i]} mutated to ${mutated_individual}`)
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

function cross_a_b(A, B) {
  // TODO: compute min length

  let children = '';

  for (let i = 0; i < A.length; i++) {
    if (Math.random() < 0.5) {
      children += A[i]
    } else {
      children += B[i]
    }
  }
  
  return children
}

function crossover() {
  console.log('Executing crossover...')
  population.sort((a, b) => fitness(b) - fitness(a))

  let children = []

  // TODO: add X best & Y worst
  for (let i = 0; i < population.length; i += 2) {
    let child = cross_a_b(population[i], population[i+1])
    console.log(`parents: ${population[i]}, ${population[i+1]} -> child: ${child}`)

    children.push(child)
  }

  for (let i = 0; i < children.length; i++) {
    population.push(children[i])
  }

  console.log(`new population length: ${population.length}`)
}

function selection() {
  console.log('Executing selection...')
  population.sort((a, b) => fitness(b) - fitness(a))
  population = population.slice(0, 500)
  console.log(`new population length: ${population.length}`)
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
  init()
  loop(100)
}

main()
