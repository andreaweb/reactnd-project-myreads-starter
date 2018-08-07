import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'

export default class BookShelves extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    bookShelves: ['Currently Reading', 'Want To Read', 'Read'], //if the books are not gonna be here, this should be props
    books: [{ width: 128, 
              height: 193, 
              cover: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' 
    }]
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
                            style={{ 
                              width: this.state.books[0].width, 
                              height: this.state.books[0].height, 
                              backgroundImage: this.state.books[0].cover}}
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
            <a>Add a book</a>
          </Link>
        </div>
      </div>
      )
  }
}