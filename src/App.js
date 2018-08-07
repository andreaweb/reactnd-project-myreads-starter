import React from 'react'
import { Switch, Route } from 'react-router-dom'
import BookShelves from './BookShelves'
import Search from './Search'
import './App.css'

export default class App extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    bookShelves: ['Currently Reading', 'Want To Read', 'Read'], //if the books are not gonna be here, this should be props
    books: [{ width: 128, 
              height: 193, 
              cover: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' 
    }]
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' component={BookShelves} />
          <Route path='/search' component={Search} />
        </Switch>
      </div>
    )
  }
}
