import React from "react";
import "./App.css";
import Book from "./Book.js";
import PropTypes from "prop-types";

const BooksGrid = ({ shelves, books, onBookShelfChanged }) => (
  <ol className="books-grid">
    {books.map((book) => (
      <li key={book.id}>
        <Book
          key={book.id}
          book={book}
          shelves={shelves}
          onBookShelfChanged={onBookShelfChanged}
        />
      </li>
    ))}
  </ol>
);

BooksGrid.propTypes = {
  books: PropTypes.array,
  shelves: PropTypes.array,
  onBookShelfChanged: PropTypes.func
};

export default BooksGrid;
