const axios = require('axios');
const API_URL = 'https://api.github.com/zen';

class MyModule {

  async getData() {
    const { data } = await axios.get(API_URL);
    console.log(data);
    return data;
  }

  load() {
    return this.getData();
  }

  methodA(n) {
    console.log('A');
    if (n > 0) {
      this.methodB();
    } else {
      this.methodC();
    }
    return 'A';
  }

  methodB() {
    console.log('B');
    return 'B';
  }

  methodC() {
    console.log('C');
    return 'C';
  }
}


module.exports = MyModule;