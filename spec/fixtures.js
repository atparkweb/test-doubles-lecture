const mockMethodB = () => {
  console.log('this is a mock of MyModule.methodB');
  return 'mock B';
};

const mockMethodC = () => {
  console.log('this is a mock of MyModule.methodC');
  return 'mock C';
};

// Fake user data
const getUser = () => {
  return {
    id: 1, 
    name: 'Andy',
    age: 88,
    hp: 10000
  };
};

module.exports = {
  getUser,
  mockMethodB,
  mockMethodC
};