import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'

export default class BookShelves extends React.Component {
  handleShelfChange = (book, event) => { 
    let shelf = event.target.value;
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;        /* updates book's shelf when there's a change in selected option */
      this.setState(state => ({
        books: this.props.books.filter(b => b.id !== book.id).concat(book) /*adds new book to shelf*/
      }))     
    })
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
            this.props.bookshelvesValues.map((name,key) => /*loops bookshelvesValues array*/
              <div className="bookshelf" key={key}>
                <h2 className="bookshelf-title">{this.props.bookshelvesNames[key]}</h2>{/*uses bookshelvesNames for shelf's title*/}
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  { this.props.books && this.props.books.length > 1
                    ?
                    this.props.books.filter(book => book.shelf === this.props.bookshelvesValues[key])/*checks if current book belongs to current shelf*/
                    .map(/*if so, display book*/
                      (book, key) => (
                        <li key={key}>
                          <div className="book">
                            <div className="book-top">
                              <div 
                                className="book-cover" 
                                style={{width: 128, height: 188, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : 
                                  'http://phillyjamz953fm.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg'})` }}
                              >
                              </div>
                              <div className="book-shelf-changer">
                                <select 
                                  onChange={(event) => this.handleShelfChange(book, event)}
                                  value={book.shelf}>
                                  <option value="move" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors.join(', ')}</div>
                            <div className="book-title">Rating: {book.averageRating}</div>
                            <div className="book-authors">Pages: {book.pageCount}</div>
                          </div>
                        </li> 
                      )
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