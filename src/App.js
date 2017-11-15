import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Search from './Search'

class BooksApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSearchPage: false,
      books: []
    }
    this.refreshBookDB = this.refreshBookDB.bind(this)
    this.updateShelf = this.updateShelf.bind(this)
  }

  componentDidMount() {
    this.refreshBookDB()
  }
  refreshBookDB() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }
  updateShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      this.refreshBookDB()
    })
  }

  render() {
    const { books, showSearchPage } = this.state
    return (
      <div className="app">
        <Route exact path="/"  render= { () => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Shelf title="Currently reading" shelf="currentlyReading"
                books={books} updateShelf={this.updateShelf} />
              <Shelf title="Want to read" shelf="wantToRead"
                books={books} updateShelf={this.updateShelf} />
              <Shelf title="Read" shelf="read"
                books={books} updateShelf={this.updateShelf} />
            </div>
            <div className="open-search">
              <Link to="/search">
               </Link>
            </div>
          </div>
        )} />
        <Route
          path="/search"
          render= { () => (  <Search onSearch={this.updateShelf} books={this.state.books} /> ) }
        />
      </div>
    )
  }
}

export default BooksApp
