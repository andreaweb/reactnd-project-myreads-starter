import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { Books } from './Books'

export default class Search extends Component {
 state = {
   query: '', /*search value that will change on input*/
   books: [] /*search results, depending on query*/
 }

 handleInputChange = () => {/*identifies every letter typed or deleted in input...*/
  this.setState({
    query: this.search.value,/*...and make it the query*/
  })
  /*searches books API according to query
  BooksAPI.search(this.search.value).then((results) => this.setState({results: results}))
*/
  console.log('change is on')
  BooksAPI.search(this.state.query,30).then((books) => {
    if(!!books){
      if(books.length>0){
        const results = books.map((book) => {
          const existingBook = this.state.books.find((b) => b.id === book.id)
          book.shelf = !!existingBook ? existingBook.shelf : 'none'
          return book
        });
        this.setState({ books: results })
      }  
    }
  })
 }

 render() {
   return (
    <div className="search-books">
      <div className="search-books-bar">{/* 'header', where the user will type what he's searching for + link to go back to main page*/}
        <Link to="/"><span className="close-search">Close</span></Link>
        <div className="search-books-input-wrapper">
          <input type="text" ref={input => this.search = input} onChange={this.handleInputChange} placeholder="Search by title or author"/>
          <p>{this.state.query}</p>
        </div>
      </div>
      <div className="search-books-results">{/* displays books according to user query*/}
        <Books {...this.state} />
      </div>
    </div>
   )
 }
}