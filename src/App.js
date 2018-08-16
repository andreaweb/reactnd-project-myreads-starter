import React from 'react'
import { Switch, Route } from 'react-router-dom'
import BookShelves from './BookShelves'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

export default class App extends React.Component {
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
        books: state.books.filter(b => b.id !== book.id).concat(book) /*adds new book to shelf*/
      }))     
    })
  }

  render() {
    return (
      <div className="app">
        <Switch>{/*will display BookShelves.js or Search.js according to path in browser... this will be changed through Link in components themselves*/}
          <Route exact path='/' render={()=><BookShelves {...this.state}/>} /> {/**/}
          <Route path='/search' render={()=><Search {...this.state} />} /> {/* I cannot use this because Bookshelf has to be parent to Search*/}
        </Switch>
      </div>
    )
  }
}
