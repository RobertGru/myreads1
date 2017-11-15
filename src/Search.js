// @flow
import React from "react";
import { Link } from "react-router-dom";

import Book from './Book'
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class Search extends React.Component {
  state = {
    results: [],
    query: ''
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
    const { updateShelf, books } = this.props
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
                results.map(book => <Book key={book.id} book={book} />)
              }
            </ol>
          </div>
        )}
      </div>
    );
  }
}
export default Search
