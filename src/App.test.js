import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Books } from './Books'
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

// test('Book change shelves', () => {
// 	const component = renderer.create(<Books state={'book': {'title': 'A volta'} }/>);
// 	let tree = component.toJSON();
// 	expect(tree).toMatchSnapshot();

// 	console.log('hallos')
// })

test('Books are rendered in correct shelf', () => {
	const component = renderer.create(
		<Books 
			index={0} 
			books={[{'title': 'A Origem', 'shelf': 'currentlyReading'}]} 
			bookshelvesValues={["currentlyReading", "wantToRead", "read"]} 
		/>
	);
	let tree = component.toJSON();
	

	console.log(tree)
})


