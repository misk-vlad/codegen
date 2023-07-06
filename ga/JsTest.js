import debug from 'debug';

let tLogger = debug('JsTest');

class JsTest {
  constructor(instance) {
    tLogger(`got ${instance} in constructor, type: ${typeof instance}`);
    this.testObject = instance;
  }

  test1() {
    let body = this.testObject.getBody();
    tLogger(`checking instance body length: ${body.length}`);
    return body.length > 3;
  }

  test2() {
    let a = Math.floor(Math.random() * 10);
    let b = Math.floor(Math.random() * 10);
    let testResult = false;
    try {
      let execResult = this.testObject.exec(a,b);
      testResult = (execResult === (a+b) );
      tLogger(`${a} + ${b} = ${execResult}`);
    } catch(e) {
      tLogger(`Error while execution of function \n === \n ${this.testObject.getBody()}`);
    }
    return testResult;
  }

  run() {
    let result = 0;

    let tests = [
      this.test1.bind(this),
      this.test2.bind(this)
    ];

    for (let i = 0; i < tests.length; i++) {
      tLogger(`Executing test #${i+1} of ${tests.length}...`);
      let testResult = tests[i]();
      tLogger(`Test #${i+1} result is ${testResult}`);
      result = result + testResult;
    }

    tLogger(`Total passed ${result} of ${tests.length} tests`);
    return result;
  }

}

export default JsTest;
