import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
var chai = require('chai'); 
import chaiEnzyme from 'chai-enzyme'
 
chai.use(chaiEnzyme())

const originalNot = Object.getOwnPropertyDescriptor(chai.Assertion.prototype, 'not').get;
Object.defineProperty(chai.Assertion.prototype, 'not', {
  get() {
    Object.assign(this, this.assignedNot);
    return originalNot.apply(this);
  },
  set(newNot) {
    this.assignedNot = newNot;
    return newNot;
  },
});

// Combine both jest and chai matchers on expect
const originalExpect = global.expect;

global.expect = (actual) => {
  const originalMatchers = originalExpect(actual);
  const chaiMatchers = chai.expect(actual);
  const combinedMatchers = Object.assign(chaiMatchers, originalMatchers);
  return combinedMatchers;
};

configure({ adapter: new Adapter() });
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;