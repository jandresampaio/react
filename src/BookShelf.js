import React from "react";
import "./App.css";
import BooksGrid from "./BooksGrid.js";
import PropTypes from "prop-types";

const BookShelf = ({ shelves, shelf, books, onBookShelfChanged }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.name}</h2>
      <div className="bookshelf-books">
        <BooksGrid
          books={books}
          shelves={shelves}
          onBookShelfChanged={onBookShelfChanged}
        />
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  shelf: PropTypes.object.isRequired,
  books: PropTypes.array,
  shelves: PropTypes.array,
  onBookShelfChanged: PropTypes.func
};

export default BookShelf;
