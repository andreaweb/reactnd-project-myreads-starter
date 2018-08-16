import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { Books } from './Books'

export default class Search extends Component {
 state = {
   query: '', /*search value that will change on input*/
   results: [] /*search results, depending on query*/
 }

 handleInputChange = () => {/*identifies every letter typed or deleted in input...*/
  this.setState({
    query: this.search.value,/*...and make it the query*/
  })
  /*searches books API according to query
  BooksAPI.search(this.search.value).then((results) => this.setState({results: results}))
*/
  BooksAPI.search(this.state.query,30).then((books) => {
    if(!!books){
      if(books.length>0){
        const results = books.map((book) => {
          const existingBook = this.props.books.find((b) => b.id === book.id)
          book.shelf = !!existingBook ? existingBook.shelf : 'none'
          return book
        });
        this.setState({ results })
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
        <ol className="books-grid">
          { this.state.results && this.state.results.length > 1
            ?
            this.state.results.map((name, key) => /*loop results*/
            <li key={key}>
             <div className="book">
                <div className="book-top">
                  <div 
                    className="book-cover" 
                    style={{ 
                      width: 128, 
                      height: 188, 
                      backgroundImage: `url(${this.state.results[key].imageLinks ? this.state.results[key].imageLinks.thumbnail : 
                        'http://phillyjamz953fm.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg'})` }}
                  >
                  </div>
                  <div className="book-shelf-changer">
                    <select value={this.state.results[key].shelf} onChange={(event) => this.handleShelfChange(this.state.results[key], event)}>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{this.state.results[key].title}</div>
                <div className="book-authors">{this.state.results[key].authors}</div>
                <div className="book-title">Rating: {this.state.results[key].averageRating}</div>
                <div className="book-authors">Pages: {this.state.results[key].pageCount}</div>
              </div>
            </li>
            ) 
            : null
          }
        </ol>
      </div>
    </div>
   )
 }
}