import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'

export default class BookShelves extends React.Component {
  state = {
    bookshelvesNames: ['Currently Reading', 'Want To Read', 'Read'],

    books: ''
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => this.setState({books: books}))
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
           {  
            this.state.bookshelvesNames.map((name,key) =>
              <div className="bookshelf" key={key}>
                <h2 className="bookshelf-title">{this.state.bookshelvesNames[key]}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  { this.state.books && this.state.books.length > 1
                    ?/* loop through every book in the current bookshelf*/
                    this.state.books.map((name, key) =>
                    <li>
                      <div className="book">
                        <div className="book-top">
                          <div 
                            className="book-cover" 
                            style={{width: 128, height: 188, backgroundImage: `url(${this.state.books[key].imageLinks ? this.state.books[key].imageLinks.thumbnail : 
                              'http://phillyjamz953fm.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg'})` }}
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
                        <div className="book-title">{this.state.books[key].title}</div>
                        <div className="book-authors">{this.state.books[key].authors}</div>
                        <div className="book-title">Rating: {this.state.books[key].averageRating}</div>
                        <div className="book-authors">Pages: {this.state.books[key].pageCount}</div>
                      </div>
                    </li>
              )
              : null }
                </ol>
                </div>
              </div> 
            )
           }
            
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <span>Add a book</span>
          </Link>
        </div>
      </div>
      )
  }
}