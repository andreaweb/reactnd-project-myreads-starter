import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import { Books } from './Books'
import * as BooksAPI from './BooksAPI'

export default class BookShelves extends React.Component {
  constructor(props){
    super(props);
    this.state = { /*bookshelves in separated arrays to make comparison easier*/
      bookshelvesNames: ['Currently Reading', 'Want To Read', 'Read'],
      bookshelvesValues: ['currentlyReading', 'wantToRead', 'read'],
      books: '' /*will be populated with API data*/
    }
  }

  getBooksData(){
    BooksAPI.getAll().then((books) => this.setState({books}))
  }
  
  componentDidMount(){
    this.getBooksData();
  }

  handleShelfChange(event, book) { 
    //console.log(book.id, event.target.value)
    let shelf = event.target.value;
    
    BooksAPI.update(book, shelf).then((results) => {
      book.shelf = shelf;   /* updates book's shelf when there's a change in selected option */
      //this.getBooksData(); //not even this works anymore
      this.setState({books:this.state.books})
      //this.setState({books: this.state.books}, console.log(state, this.state.books))
      //removes the book
      /*this.setState(state => ({   
        books: this.state.books.filter(b => b.id !== book.id).concat(book) 
      }))  */   
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
                  <Books index={key} {...this.state} onUpdate={(event, book) => this.handleShelfChange(event, book)} />
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