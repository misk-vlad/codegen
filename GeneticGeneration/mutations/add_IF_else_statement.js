
module.exports = {
  mutationChance: 0.01,
  type: "IfStatement",
  func: function mutationAddParameter(node) {
    node.params.push({
      type: 'Identifier',
      name: randomIdentifier()
    })
    return node;
  },
}

