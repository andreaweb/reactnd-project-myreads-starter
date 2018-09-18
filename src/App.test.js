import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Books } from './components/Books'
import BookShelves from './pages/BookShelves'
import { Enzyme, configure, shallow, mount } from 'enzyme'
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
		console.log("Number of books total: "+data.length)
		expect(data).not.toHaveLength(0)
	})
})

describe('BookShelves', () => {
	test('renders 3 bookshelves', async () => {
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

	// test("removes books", async() => {
	// 	const data = await BooksAPI.getAll()
	// 	const totalBooks = data.length
	// 	const wrapper = await mount(
	// 		<BrowserRouter>
	// 			<BookShelves 
	// 				bookshelvesNames={['Currently Reading', 'Want To Read', 'Read']}
	// 			    bookshelvesValues={['currentlyReading', 'wantToRead', 'read']}
	// 			    books={data}
	// 			    onShelfChange={(event, book)=>this.handleShelfChange(event,book)}
	// 	    	/>
	//     	</BrowserRouter>
	// 	)
	// 	const book = wrapper.find('.js-test-select').at(1);
	// 	book.simulate('onChange', { target: { value: 'none'}});
	// 	const newData = await BooksAPI.getAll()
	// 	console.log(totalBooks, newData.length)
	// })

	test("responds to name change", async () => {
	  const event = {target: {value: 'none'}};
	  const data = await BooksAPI.getAll()
		const totalBooks = data.length
	  const wrap = mount(
	    <BrowserRouter>
			<BookShelves 
				bookshelvesNames={['Currently Reading', 'Want To Read', 'Read']}
			    bookshelvesValues={['currentlyReading', 'wantToRead', 'read']}
			    books={data}
			    onShelfChange={(event, book)=>this.handleShelfChange(event,book)}
	    	/>
    	</BrowserRouter>
	  );
	  const book = wrap.find('.js-test-select').at(1);
//	  const bookshelf = wrap.find('.bookshelf').at(1);
	  const handleChangeSpy = sinon.spy(book.instance(), "onChange");
	  wrap.update(); // Force re-render
	  book.simulate('change', event);
	  expect(handleChangeSpy.calledOnce).to.equal(true);
	})
})


