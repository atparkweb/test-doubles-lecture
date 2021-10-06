const { expect } = require('chai');
const { spy } = require('sinon');
const MyModule = require('../mymodule');
const nock = require('nock');

const { mockMethodB } = require('./fixtures');

describe('Array.prototype', () => {
  const setupSpy = () => {
    spy(Array.prototype, 'join');
  };
  
  const tearDownSpy = () => {
    // removes spies from join
    Array.prototype.join.restore();
  };

  beforeEach(() => {
    setupSpy();
  });
  
  afterEach(() => {
    tearDownSpy();
  });
  
  describe('.toString', () => {
    it('should call join', () => {
      let arr = [1,2,3,4];

      arr.toString();

      expect(Array.prototype.join.called).to.equal(true);
    });
  });
});

describe('Github API', () => {
  // this intercepts all requests to github api and returns fake data
  const scope = nock('https://api.github.com')
    
  scope.get('/zen')
    .reply(200, 'Mock Response Data');

  let module;

  beforeEach(() => {
    module = new MyModule();
  });

  it('should respond with a string', async () => {
    const data = await module.load();
    expect(typeof data).to.equal("string");
  });
});

describe('Method A', () => {
  let module;
  
  const setup = () => {
    module = new MyModule();

    // replace methodB with a mock
    module.methodB = mockMethodB;
    spy(module, 'methodB');
    spy(module, 'methodC');
  };
  
  const tearDown = () => {
    spy(module.methodB.restore());
    spy(module.methodC.restore());
  };

  beforeEach(() => {
    setup();
  });
  
  afterEach(() => {
    tearDown();
  });

  // black box test
  it('should return "A"', () => {
    const result = module.methodA(2);
    expect(result).to.equal("A");
  });

  // white-box: testing all conditional branches...
  it('should call methodB for positive args', () => {
    module.methodA(2);
    expect(module.methodB.called).to.equal(true);
  });

  it('should not call methodB for negative args', () => {
    module.methodA(-2);
    expect(module.methodB.called).to.equal(false);
  });

  it('should call methodC for negative args', () => {
    module.methodA(-2);
    expect(module.methodC.called).to.equal(true);
  });
  it('should not call methodC for positive args', () => {
    module.methodA(10);
    expect(module.methodC.called).to.equal(false);
  });
});
