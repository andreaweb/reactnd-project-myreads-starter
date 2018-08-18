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
    books: ''
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
        this.setState({books: this.state.books});
        console.log('hsc')
      })
  }

  render() {
    return (
      <div className="app">
        <Switch>{/*will display BookShelves.js or Search.js according to path in browser... this will be changed through Link in components themselves*/}
          <Route 
            exact 
            path='/' 
            render={()=>
              <BookShelves {...this.state} onLoad={this.getBooksData()} onUpdate={(event, book)=>this.handleShelfChange(event,book)} />
            } 
          />
          <Route 
            path='/search' 
            render={()=>
              <Search {...this.state} onUpdate={(event, book)=>this.handleShelfChange(event,book)}/>
            } 
          /> 
        </Switch>
      </div>
    )
  }
}
