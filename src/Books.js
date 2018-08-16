import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'

export default class Books extends React.Component {
	state = { /*bookshelves in separated arrays to make comparison easier*/
		bookshelvesNames: ['Currently Reading', 'Want To Read', 'Read'],
		bookshelvesValues: ['currentlyReading', 'wantToRead', 'read'],
		books: '' /*will be populated with API data*/
	}
  
	getBooksData(){ /*separate function so it can be used both in componentDidMount and in handleShelfChange*/
		BooksAPI.getAll().then((books) => this.setState({books}))
	}
  
	componentDidMount(){
		this.getBooksData();
  	}

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
  	return  (
		<div>
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
    	</div>
    )
  }
}