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
		if(nextProps){
			if(this.props.index > -1){
				this.setState({arr: nextProps.books.filter(book => book.shelf === this.props.bookshelvesValues[this.props.index])})
			}else{
				this.setState({arr: nextProps.books})
			}
		}	
	}

	handleShelfChange(event, book) { 
	    //console.log(book.id, event.target.value)
	    let shelf = event.target.value;
	    
	    BooksAPI.update(book, shelf).then((results) => {
	      book.shelf = shelf;   /* updates book's shelf when there's a change in selected option */
	      this.setState({arr:this.state.arr});
	    })
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
		                          onChange={(event) => this.handleShelfChange(event, book)}
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