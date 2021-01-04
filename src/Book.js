import React from "react";
import "./App.css";
import BookShelfChanger from "./BookShelfChanger";
import PropTypes from "prop-types";

const Book = ({ book, shelves, onBookShelfChanged }) => {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${
              book.imageLinks ? book.imageLinks.thumbnail : ""
            })`
          }}
        />
        <BookShelfChanger
          shelves={shelves}
          selected={book.shelf}
          onBookShelfChanged={(shelf) => onBookShelfChanged(book, shelf)}
        />
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors
        ? book.authors.map((author) => (
            <div key={author} className="book-authors">
              {author}
            </div>
          ))
        : ""}
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object,
  shelves: PropTypes.array
};

export default Book;
