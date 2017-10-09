import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'
import Book from './Book'

class Shelf extends Component {
    static propTypes = {
      books: PropTypes.array,
      onDeleteBook: PropTypes.func
    }

    render () {
      return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">TEST SHELF</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  <Book />
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )    
    }
  
}

export default Shelf