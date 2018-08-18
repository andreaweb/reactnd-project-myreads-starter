import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import { Books } from './Books'

export default class BookShelves extends React.Component {
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
                  <Books index={key} {...this.props} onShelfChange={this.props.onShelfChange}/>
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