import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

export default class Search extends Component {
 state = {
   query: '',
   results: []
 }

 handleInputChange = () => {
  this.setState({
    query: this.search.value,
  })
  BooksAPI.search(this.search.value).then((results) => this.setState({results: results}))
 }

 handleShelfChange = (book, event) => {
    console.log(book)
    BooksAPI.update(book,event.target.value)
  }

 render() {
   return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/"><span className="close-search">Close</span></Link>
        <div className="search-books-input-wrapper">
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
                      backgroundImage: `url(${this.state.results[key].imageLinks ? this.state.results[key].imageLinks.thumbnail : 
                        'http://phillyjamz953fm.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg'})` }}
                  >
                  </div>
                  <div className="book-shelf-changer">
                    <select value={null} onChange={(event) => this.handleShelfChange(this.state.results[key], event)}>
                      <option value="move" disabled selected>Move to...</option>
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