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
		console.log(nextProps);
	  this.setState({ arr: nextProps.books });  
	}
	componentDidMount(){
		if(this.props.books){
			if(this.props.index){
				console.log(this.props.books)
				this.setState({arr: this.props.books.filter(book => book.shelf === this.props.bookshelvesValues[this.props.index])})
			}else{
				this.setState({arr: this.props.books})
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