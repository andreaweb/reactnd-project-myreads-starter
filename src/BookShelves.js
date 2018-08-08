import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'

export default class BookShelves extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    bookShelves: ['Currently Reading', 'Want To Read', 'Read'], //if the books are not gonna be here, this should be props
    books: ''
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => this.setState({books: books}))
    console.log(this.state.books)
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
            this.state.bookShelves.map((name,key) =>
              <div className="bookshelf" key={key}>
                <h2 className="bookshelf-title">{this.state.bookShelves[key]}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  { /* loop through every book in the current bookshelf*/}
                    <li>
                      <div className="book">
                        <div className="book-top">
                          <div 
                            className="book-cover" 
                            
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
                        <div className="book-title">To Kill a Mockingbird</div>
                        <div className="book-authors">Harper Lee</div>
                      </div>
                    </li>
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