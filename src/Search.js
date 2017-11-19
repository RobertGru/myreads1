// @flow
import React from "react";
import { Link } from "react-router-dom"
import Shelf from './Shelf'

import * as BooksAPI from "./BooksAPI"
import "./App.css"

class Search extends React.Component {
  state = {
    results: [],
    query: ''
  }

  updateResults(results){
    const booksOnShelves = results.map(book => {
      book.shelf = "none"
      this.props.books.forEach(bookWithShelf => {
        if (book.id === bookWithShelf.id) {
          book.shelf = bookWithShelf.shelf
        }
      })
      return book
    })
    this.setState({
      results: booksOnShelves
    })
  }

  searchQuery(query){    
    this.setState({ query })
    if (query !== '') {
      BooksAPI.search(query, 20).then(
      resp => {
        if (resp.error) {
          this.setState({
            results: []
          })
        } else {
          this.updateResults(resp)
        }
      }, error => {
        console.log("ERROR RESPONSE FROM API SERVER")
      })
    }
  }

  render() {
    const { results, query } = this.state
    const { updateShelf } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.searchQuery(event.target.value)}
            />
          </div>
        </div>
        {results.length > 0 && (
          <div className="search-books-results">
            <Shelf title="Books Found" shelf="none"
              books={results} updateShelf={updateShelf} searchFlag={true}/>
          </div>
        )}
      </div>
    );
  }
}
export default Search
