import React from 'react'
import './App.css'

export class Books extends React.Component {
	constructor(props){
		super(props);
		console.log(props)
		this.state = { arr: []}
	}

	componentWillReceiveProps(nextProps) {/*controls books to be displayed depending on component/bookshelf*/
		if(nextProps !== this.props){
			if(this.props.index > -1){/*filters book according to shelf if Bookshelves component (with index) */
				this.setState({arr: nextProps.books.filter(book => book.shelf === this.props.bookshelvesValues[this.props.index])})
			}else{	/*no filter needed in Search component (or any component that doesn't have index) */
				this.setState({arr: nextProps.books})
			}
		}	
	}

	render() {
  		return  (
			<ol className="books-grid">
				{ 	
				this.props.books && this.state.arr
	            ?
		           this.state.arr.map(
		              (book, key) => (
		                <li key={key}>
		                  <div className="book">
		                    <div className="book-top">
		                      <div 
		                        className="book-cover" 
		                        style={{
		                        	width: 128,
		                        	height: 188,
		                        	backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : 
		                          'http://phillyjamz953fm.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg'})` }}
		                      >
		                      </div>
		                      <div className="book-shelf-changer">
		                        <select 
		                          onChange={(event) => this.props.onShelfChange(event, book)}
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
		                	{/*avoids bug if there's no authors names in API */}
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