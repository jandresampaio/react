import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./BookShelf";
import { Route, Link } from "react-router-dom";
import BookSearch from "./BookSearch";
class BooksApp extends Component {
  state = {
    shelves: [
      {
        id: "read",
        name: "Read"
      },
      {
        id: "currentlyReading",
        name: "Currently Reading"
      },
      {
        id: "wantToRead",
        name: "Want to Read"
      }
    ],
    books: {}
  };

  constructor(props) {
    super(props);
    this.onBookShelfChanged = this.onBookShelfChanged.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setBooksDictionary(books);
    });
  }

  setBooksDictionary(books) {
    const booksMap = books.reduce((acc, book) => {
      acc[book.id] = book;
      return acc;
    }, {});
    this.setState((prevState) => ({
      books: { ...prevState.books, ...booksMap }
    }));
  }

  onBookShelfChanged(book, shelf) {
    BooksAPI.update(book, shelf).then((newShelves) => {
      this.setState((prevState) => {
        const { books } = prevState;
        const booksAndShelves = Object.entries(newShelves).reduce(
          (books, [shelf, bookIds]) => {
            bookIds.forEach((bookId) => (books[bookId] = shelf));
            return books;
          },
          {}
        );
        Object.values(books).forEach((b) => {
          if (b.shelf !== booksAndShelves[b.id])
            b.shelf = booksAndShelves[b.id];
        });
        return {
          books: { ...books, [book.id]: { ...book, shelf } }
        };
      });
    });
  }

  onBookSearch(results) {
    this.setBooksDictionary(results);
  }

  render() {
    const { shelves, books } = this.state;
    if (!shelves) return;
    const booksArray = Object.values(books);
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books-content">
                <div>
                  {shelves.map((shelf) => (
                    <BookShelf
                      key={shelf.id}
                      shelf={shelf}
                      books={booksArray.filter((b) => b.shelf === shelf.id)}
                      shelves={shelves}
                      onBookShelfChanged={this.onBookShelfChanged}
                    />
                  ))}
                </div>
              </div>
            )}
          />
          <Route
            path="/search"
            render={({ history }) => (
              <BookSearch
                books={books}
                shelves={shelves}
                onSearch={(results) => this.onBookSearch(results)}
                onBookShelfChanged={this.onBookShelfChanged}
              />
            )}
          />
          <div className="open-search">
            <Link to="/search" className="add-contact">
              Search
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BooksApp;
