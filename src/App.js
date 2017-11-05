import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Book from './Book'

class BooksApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSearchPage: false,
      books: [],
      results: [],
      query: ''
    }
    this.refreshBookDB = this.refreshBookDB.bind(this)
    this.updateShelf = this.updateShelf.bind(this)
    this.updateQuery = this.updateQuery.bind(this)
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
  updateQuery(query){
    this.setState({ query })
    if (query !== '') {
      BooksAPI.search(query, 20).then((results) => {
        this.setState({ results })
    })}
  }
  render() {
    const { books, query, results, showSearchPage } = this.state
    
    console.log(results.length)
    return (
      <div className="app">
        {showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/* SEARCH CODE HERE */}
                <input               
                  type="text" 
                  placeholder="Search by title or author"
                  value={this.query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            {results.length > 0 && (
              <div className="search-books-results">
                <ol className="books-grid">
                  {
                    results.map(book => <Book key={book.id} book={book} updateShelf={this.updateShelf}/>)
                  }
                </ol>
              </div>
            )}
          </div>
        ) : (
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
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
            
          </div>
          
        )}
      </div>
    )
  }
}

export default BooksApp
