import React from 'react'
import { Switch, Route } from 'react-router-dom'
import BookShelves from './BookShelves'
import Search from './Search'
import './App.css'

export default class App extends React.Component {
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
