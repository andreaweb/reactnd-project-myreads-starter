import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Combine both jest and chai matchers on expect
const originalExpect = global.expect;

configure({ adapter: new Adapter() });
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;