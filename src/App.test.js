import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Books } from './components/Books'
import { Enzyme, configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';
import { XMLHttpRequest } from 'xmlhttprequest';
global.XMLHttpRequest = XMLHttpRequest;
import * as BooksAPI from './api/BooksAPI'
import sinon from 'sinon'

configure({adapter: new Adapter()});

describe('API Call', () => {
  it('gets books by default', async () => {
  	    const data = await BooksAPI.getAll()
  	    console.log("Number of books total: "+data.length)
    	expect(data).not.toHaveLength(0)
    // return BooksAPI.getAll()
    // 	.then(
    // 		(books) => console.log('Success')
    // 	)
    // 	.catch(
    // 		(err) => console.log('Error '+err)
    // 	)
  })
})
describe('Bookshelves', () => {
  it('renders 3 bookshelves', () => {

  })
})


