const PATH_TO_MUATIONS = 'mutations'
const { log } = require('console');
const fs = require('fs');
const { func } = require('./mutations/add_IF_else_statement');


const readdir = new Promise((resolve, reject) => {
    const PATH = __dirname+'/'+PATH_TO_MUATIONS
    fs.readdir(PATH, (error, files) => {
        
        if (error) {
            console.log("Some error in read dir with mutations"+ error);
            resolve([])
        }

        let mutations = new Map();

        files.forEach(nameFile => {
            let code = require(PATH +"/"+ nameFile)
            let type = code.type


            const addMutation = (mutation,type) => {
                const newMutate = {
                    chance  : mutation.mutationChance,
                    func    : mutation.func
                };

                if (!mutations.has(type)) {
                    mutations.set(type,[newMutate])
                }else{
                    mutations.set(type,[...mutations.get(type), newMutate]
                    )
                }
            }
         
            if (type) {
                addMutation(code,type)
            }else if (Array.isArray(code)) {
                code.forEach(oneMutation => {
                    addMutation(oneMutation,oneMutation.type)
                })
            }
        })

        resolve (mutations)
        
    })
    
  });



//module.exports = 
async function readAllMutations () {    
    try {
        let mutations = await readdir;
        console.log();
        console.log(mutations);
    } catch (error) {
        console.error(error);
    }
}

readAllMutations ()