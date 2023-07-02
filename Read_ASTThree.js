import fs from 'fs'
import esprima from 'esprima'

export default async function SynthThree (path = './InputCode.js') {
    try {
        const script = fs.readFileSync(path, 'utf8');
        return esprima.parseScript(script);
      } catch (err) {
        console.error("cano read file "+ err)
        return {}
      }
} 








