// @flow
import React from "react";
import { Link } from "react-router-dom";

import Book from './Book'
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
      query: ''
    }
    this.searchQuery = this.searchQuery.bind(this)
  }

  searchQuery(query){
    console.log(query)
    this.setState({ query })
    if (query !== '') {
      BooksAPI.search(query, 20).then((results) => {
        this.setState({ results })
    })}
  }


  render() {
    const { results, query } = this.state
    const { updateShelf, books, showSearchPage } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">

          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.query}
              onChange={(event) => this.searchQuery(event.target.value)}
            />
          </div>
        </div>
        {results.length > 0 && (
          <div className="search-books-results">
            <ol className="books-grid">
              {
                results.map(book => <Book key={book.id} book={book} onSearch={updateShelf}/>)
              }
            </ol>
          </div>
        )}
      </div>
    );
  }
}
export default Search
