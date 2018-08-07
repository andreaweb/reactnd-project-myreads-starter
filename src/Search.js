import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

export default class Search extends Component {
 state = {
   query: '',
   results: []
 }

 handleInputChange = () => {
  console.log(this.search.value)
  this.setState({
    query: this.search.value,
  })
  BooksAPI.search(this.search.value).then((results) => this.setState({results: results}))
  console.log(this.state.results)
 }

 render() {
   return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input type="text" ref={input => this.search = input} onChange={this.handleInputChange} placeholder="Search by title or author"/>
          <p>{this.state.query}</p>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          { this.state.results && this.state.results.length > 1
            ?
            this.state.results.map((name, key) =>
            <li key={key}>
             <div className="book">
                <div className="book-top">
                  <div 
                    className="book-cover" 
                    style={{ 
                      width: 128, 
                      height: 188, 
                      backgroundImage: `url(${this.state.results[key].imageLinks.thumbnail})` }}
                  >
                  </div>
                  <div className="book-shelf-changer">
                    <select>
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
                <div className="book-authors">{this.state.results[key].description}</div>
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