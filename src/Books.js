import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'

export class Books extends React.Component {
	constructor(props){
		super(props);
		this.state = { arr: []}
	}

	componentWillReceiveProps(nextProps) {
		console.log('13')
		console.log(this.props.books)
		if(nextProps){
			console.log('first if')
			console.log(this.props.index)
			if(this.props.index > -1){
				console.log('enter')
				this.setState({arr: nextProps.books.filter(book => book.shelf === this.props.bookshelvesValues[this.props.index])})
			}else{
				this.setState({arr: nextProps.books})
			}
		}	
	}

	render() {
  		return  (
			<ol className="books-grid">
				{ 	
				this.props.books && this.props.books.length > 1
	            ?
		           this.state.arr.map(
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
		                          onChange={(event) => this.props.onUpdate(event, book)}
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
		                    <div className="book-authors">{book.authors ? book.authors.join(', ') : 'Unknown or Unspecified'}</div>
		                    <div className="book-title">Rating: {book.averageRating}</div>
		                    <div className="book-authors">Pages: {book.pageCount}</div>
		                  </div>
		                </li> 
		              )
		            )
	            : null 
	        	}
	    	</ol>
	    )
	}
}