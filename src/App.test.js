import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Books } from './Books'
import { Enzyme, configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';
import sinon from 'sinon'

configure({adapter: new Adapter()});

// Wanted to test but couldn't get stuff to work, will try again some other time


// test('Book change shelves', () => {
// 	const component = renderer.create(<Books state={'book': {'title': 'A volta'} }/>);
// 	let tree = component.toJSON();
// 	expect(tree).toMatchSnapshot();

// 	console.log('hallos')
// })

// test('Books are rendered in correct shelf', () => {
// 	const component = renderer.create(
// 		<Books 
// 			index={0} 
// 			books={[{'title': 'A Origem', 'shelf': 'currentlyReading'}]} 
// 			bookshelvesValues={["currentlyReading", "wantToRead", "read"]} 
// 		/>
// 	);
// 	let tree = component.toJSON();
// 	expect(tree).toMatchSnapshot();

// 	console.log(tree)
// })
// const spy = sinon.spy(Books.prototype, 'componentWillReceiveProps');

// const wrapper = shallow(<Books foo="bar" />);
// console.log()
// expect(spy).to.have.property('callCount', 0);
// wrapper.setProps({ foo: 'foo' });
// expect(spy).to.have.property('callCount', 1);

