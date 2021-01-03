import PropTypes from "prop-types";

export class ShelfModel {}

export class BookModel {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    imageLinks: PropTypes.objectOf({
      thumbnail: PropTypes.string,
    }),
    authors: PropTypes.arrayOf(PropTypes.string),
  };
}
