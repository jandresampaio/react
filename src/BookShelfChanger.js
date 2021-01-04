import React from "react";
import "./App.css";
import PropTypes from "prop-types";

const noneSelectedKey = "none";

const BookShelfChanger = ({
  shelves,
  selected = noneSelectedKey,
  onBookShelfChanged
}) => {
  const availableShelves = [...shelves, { id: noneSelectedKey, name: "None" }];
  return (
    <div className="book-shelf-changer">
      <select
        value={selected}
        onChange={(e) => {
          onBookShelfChanged(e.target.value);
        }}
      >
        <option key="move" value="move" disabled>
          Move to...
        </option>
        {availableShelves.map((shelf) => (
          <option
            key={shelf.id}
            value={shelf.id}
            disabled={selected === shelf.id}
          >
            {shelf.name}
          </option>
        ))}
      </select>
    </div>
  );
};

BookShelfChanger.propTypes = {
  shelves: PropTypes.array,
  selected: PropTypes.string,
  onBookShelfChanged: PropTypes.func
};

export default BookShelfChanger;
