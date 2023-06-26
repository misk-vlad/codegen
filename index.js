const esprimaReader = require('./primaMutate')


async function main() {
    try {
        
        console.log(JSON.stringify(await esprimaReader(), 0, 4));

    } catch (error) {
        
    }
}


main()