class Mutation {
    static NewMutation (type, mutation) {
        let mutation = new Mutation(mutation.chance,type,mutation.func)
        return mutation
    }

    _mutateFunction = (node) => {return node}
    get mutateFunction () {
       return _mutateFunction
    }
    
    constructor (chance,type,func) {
        this.type = type
        this.chance = chance
        this._mutateFunction = func
    }
    
    
    mutate (node) {
       return this._mutateFunction(node)
    }
}