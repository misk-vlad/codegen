const esprima = require('esprima');
const pyjs = require('pyjs');


const fs = require('fs');
const jsCode = fs.readFileSync('example.js', 'utf8');
const ast = esprima.parseScript(jsCode);


const pythonCode = {
  type: 'Module',
  body: [
    {
      type: 'FunctionDef',
      name: 'main',
      args: { args: [], vararg: null, kwonlyargs: [], kw_defaults: [], kwarg: null, defaults: [] },
      body: [
        {
          type: 'Expr',
          value: {
            type: 'Call',
            func: { type: 'Name', id: 'print', ctx: { type: 'Load' } },
            args: [{ type: 'Str', s: 'Hello, World!' }],
            keywords: []
          }
        }
      ],
      decorator_list: [],
      returns: null
    }
  ]
};


const generatedPythonCode = pyjs(ast);
console.log(generatedPythonCode);



