import React from "react";
import "./App.css";
import BookShelfChanger from "./BookShelfChanger";
import PropTypes from "prop-types";
import { BookModel } from "./models";

function Book(props) {
  const { book, shelves, onBookShelfChanged } = props;
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
}

Book.propTypes = {
  book: PropTypes.objectOf(BookModel),
  shelves: PropTypes.array
};

export default Book;
