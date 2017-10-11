import React from 'react'
import PropTypes from 'prop-types'
import './App.css'
import Book from './Book'

const Shelf = (props) => (       

  <div className="bookshelf">
    <div className="list-books">           
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">

              <ol className="books-grid">
                {props.books
                  .filter(book => book.shelf === `${props.query}`)
                  .map(book => <Book key={book.id} book={book} updateShelf={props.updateShelf} />)}
              </ol>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
)

Shelf.propTypes = {   
  books: PropTypes.array.isRequired,    
  updateShelf: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired
}

export default Shelf