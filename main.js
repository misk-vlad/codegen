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
