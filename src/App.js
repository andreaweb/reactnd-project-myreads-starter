import React from 'react'
import { Switch, Route } from 'react-router-dom'
import BookShelves from './BookShelves'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React);
}

export default class App extends React.Component {
  state = { /*bookshelves in separated arrays to make comparison easier*/
    bookshelvesNames: ['Currently Reading', 'Want To Read', 'Read'],
    bookshelvesValues: ['currentlyReading', 'wantToRead', 'read'],
    books: ''
  }

  getBooksData = () =>{
    BooksAPI.getAll().then((books) => this.setState({books}))
  }
  
  componentDidMount(){
    this.getBooksData();
  }

  handleShelfChange(event, book) { 
      let shelf = event.target.value;  
      BooksAPI.update(book, shelf).then((results) => {
        book.shelf = shelf;   /* updates book's shelf when there's a change in selected option */
        this.setState({books: this.state.books});
      })
  }

  render() {
    return (
      <div className="app">
        <Switch>{/*will display BookShelves.js or Search.js according to path in browser... this will be changed through Link in components themselves*/}
          <Route 
            path='/'
            exact
            render={(state)=>
              <BookShelves {...this.state} onShelfChange={(event, book)=>this.handleShelfChange(event,book)} />
            } 
          />
          <Route 
            path='/search' 
            render={(state)=>
              <Search {...this.state} onShelfChange={(event, book)=>this.handleShelfChange(event,book)} getBookshelves={this.getBooksData} />
            } 
          /> 
        </Switch>
      </div>
    )
  }
}
