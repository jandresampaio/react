import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import BooksGrid from "./BooksGrid.js";

var timerId;
const debounceFunction = (func, delay) => {
  clearTimeout(timerId);
  timerId = setTimeout(func, delay);
};

class BookSearch extends Component {
  state = {
    query: "",
    visibleIds: []
  };

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }));
  };

  clearQuery = () => {
    this.updateQuery("");
  };

  onQueryChange(query) {
    this.setState(({ visibleIds }) => {
      return {
        query,
        visibleIds: query ? visibleIds : []
      };
    });
    if (!query) {
      return;
    }
    debounceFunction(
      () =>
        BooksAPI.search(query).then((books) => {
          const searchResults = !books || books.error ? [] : books;
          this.setState({
            visibleIds: searchResults.map((b) => b.id)
          });
          this.props.onSearch(searchResults);
        }),
      300
    );
  }

  render() {
    const { shelves, books, onBookShelfChanged } = this.props;
    const { query, visibleIds } = this.state;
    const visibleBooks = visibleIds
      .filter((id) => books[id])
      .map((id) => books[id]);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.onQueryChange(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            books={visibleBooks}
            shelves={shelves}
            onBookShelfChanged={onBookShelfChanged}
          />
        </div>
      </div>
    );
  }
}

export default BookSearch;
