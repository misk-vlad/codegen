function generatePythonCode(node) {
  if (node.type === 'Program') {
    return node.body.map(generatePythonCode).join('\n');
  } else if (node.type === 'FunctionDeclaration') {
    const functionName = node.id.name;
    const args = node.params.map((param) => param.name).join(', ');
    const body = generatePythonCode(node.body);
    return `def ${functionName}(${args}):\n${body}`;
  } else if (node.type === 'ReturnStatement') {
    const value = generatePythonCode(node.argument);
    return `return ${value}`;
  } else if (node.type === 'BinaryExpression') {
    const left = generatePythonCode(node.left);
    const right = generatePythonCode(node.right);
    return `(${left} ${node.operator} ${right})`;
  } else if (node.type === 'CallExpression') {
    const callee = generatePythonCode(node.callee);
    const args = node.arguments.map(generatePythonCode).join(', ');
    return `${callee}(${args})`;
  } else if (node.type === 'Literal') {
    return node.raw;
  } else if (node.type === 'Identifier') {
    return node.name;
  } else if (node.type === 'VariableDeclaration') {
    return generatePythonCode(node.declarations[0]);
  } else if (node.type === 'VariableDeclarator') {
    return `${node.id.name} = ${node.init.value} `;
  } else if (node.type === 'BlockStatement') {
    return `    ${generatePythonCode(node.body[0])}`;
  } else {
    throw new Error(`Unsupported node type: ${node.type}`);
  }
}

// let pythonCode = generatePythonCode(tree);
// console.log(pythonCode);

export default generatePythonCode;