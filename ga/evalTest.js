var isStrict = (function() { return !this; })();
console.log(`isStrict: ${isStrict}`);

let f = 'console.log("hello, world!"); \
function sum(a,b) {return a + b \n}';
console.log(eval(f));
console.log(sum(4,5));