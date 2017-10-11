import React from 'react'
import PropTypes from 'prop-types'
import './App.css'


const Book = (props) => ( 
       
  <li>
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193,
          backgroundImage: `url(${props.book.imageLinks.thumbnail})`, }} />
        <div className="book-shelf-changer">
          <select onChange={e => props.updateShelf(props.book, e.target.value)} defaultValue={props.book.shelf} >
            <option value="default" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{ props.book.authors.map(author =>
          (<p key={author}> {author}
          </p>),) } </div>
    </div>
  </li>
)    

Book.propTypes = {  
  book: PropTypes.object.isRequired,
  updateShelf: PropTypes.func.isRequired  
}

export default Book