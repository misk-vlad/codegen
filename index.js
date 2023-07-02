import Read_ASTThree from './Read_ASTThree.js';
import valid from './EST_valid_three.js'
import escodegen from "escodegen"
//import readAllMutations from './geneticAlgoritm/readAll_mutations'
//import GeneticAlghorithm from './geneticAlgoritm';
import escope from 'escope';
async function main() {
    try {
        const AST_Three = await Read_ASTThree()
        

        //console.log(JSON.stringify(AST_Three,0,4));

        let answer = querry(AST_Three,"*")

        console.log(JSON.stringify(answer,0,4));

        console.log(valid(AST_Three,true))
        
        //let generatedCode  = escodegen.generate(AST_Three);
        //console.log(generatedCode);
        //console.log(123456);



const statements = [
    "BlockStatement",
    "BreakStatement",
    "ContinueStatement", 
    "DebuggerStatement", 
    "DoWhileStatement", 
    "EmptyStatement", 
    "ExpressionStatement",  
    "ForStatement",
    "ForInStatement", 
    "ForOfStatement", 
    "FunctionDeclaration",
    "IfStatement", 
    "LabeledStatement", 
    "ReturnStatement", 
    "SwitchStatement", 
    "ThrowStatement", 
    "TryStatement", 
    "VariableDeclaration",
    "WhileStatement", 
    "WithStatement",
]




        //const mutations = await readAllMutations()
        //const geneticAlghorithm = new GeneticAlghorithm(mutations)
    } catch (error) {
        
    }
}


main()


/**
 * 1) пройтись по блокам дерева
 * 2) если мутируем можем добавить такой блок
 *  можно мутировать тип, индефайер, аргументы
 * 
 */

function querrySelector () {

}

import esquerrry from "esquery";
function querry (astThree, querry) {
    return esquerrry(astThree,"*")
}

function visibleArea (node) {
    return []
}


