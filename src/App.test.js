import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Books } from './components/Books'
import BookShelves from './pages/BookShelves'
import { Enzyme, configure, shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';
import { XMLHttpRequest } from 'xmlhttprequest';
import { BrowserRouter } from 'react-router-dom'
global.XMLHttpRequest = XMLHttpRequest;
import * as BooksAPI from './api/BooksAPI'
import sinon from 'sinon'

configure({adapter: new Adapter()});

describe('API Call', () => {	
	it('gets books by default', async () => {
		const data = await BooksAPI.getAll()
		expect(data).not.toHaveLength(0)
	})
})

describe('BookShelves', () => {
	// test('renders 3 bookshelves', async () => {
		const data = await BooksAPI.getAll()
		const wrapper = await shallow(
				<BookShelves 
					bookshelvesNames={['Currently Reading', 'Want To Read', 'Read']}
				    bookshelvesValues={['currentlyReading', 'wantToRead', 'read']}
				    books={data}
		    	/>
		)
		const bookshelves = wrapper.find('.bookshelf')
		expect(bookshelves).toHaveLength(3)
	})

	test("doesn't repeat or forget to render books", async () => {
		const data = await BooksAPI.getAll()
		const totalBooks = data.length;
		const wrapper = await mount(
			<BrowserRouter>
				<BookShelves 
					bookshelvesNames={['Currently Reading', 'Want To Read', 'Read']}
				    bookshelvesValues={['currentlyReading', 'wantToRead', 'read']}
				    books={data}
		    	/>
	    	</BrowserRouter>
		)
		const booksRendered = wrapper.find('.book')
		expect(booksRendered).toHaveLength(totalBooks)
	})

	test("calls handleShelfChange", async () => {
		const data = await BooksAPI.getAll()
		let haveBeenCalled = false;
		const handleShelfChange = () => {
		    haveBeenCalled = true;
		}
		const wrapper = await mount(
			<BrowserRouter>
				<BookShelves 
					bookshelvesNames={['Currently Reading', 'Want To Read', 'Read']}
				    bookshelvesValues={['currentlyReading', 'wantToRead', 'read']}
				    books={data}
				    onShelfChange={()=>handleShelfChange()}
		    	/>
	    	</BrowserRouter>
		)
		const book = wrapper.find('.book').at(0)
		book.find('.js-test-select').at(0).props().onChange({target: {value: 'none'}})
		expect(haveBeenCalled).toBeTruthy()
	})
})


