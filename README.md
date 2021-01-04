# MyReads Project

The goal of this project is to display a bookshelf app that allows searching and categorize books you have read, are currently reading, or want to read. The project emphasizes using React to build the application and provides an API server and client library that you will use to persist information as you interact with the application.

# Routing

Project has two main routes, the default, which displays the books by shelf (App.js) and the /search (BookSearch.js), in which the user can search for any book provided by the API.

# Component refactoring

Common pieces of both routes, like Books and Books Grid were separated from the base code and refactored into components.
Book Shelf Changer was also separated, in order to be reused or changed in the future more easily.

# State

Shelves was assumed to be a static piece of data on the App root.
It was assumed that books are at the base level of the app.
-On the Shelf components, only the books with associated shelves are displayed.
-On the Search component the state of the results is kept and then books is provided as input from parent component, which results in displaying the resulting books as a filter operation from both data

# Data flow

Following the inverse data flow principle, nested components emit "events" to their parents chain of components, which, in turn, reset their inputs to the children components.
Biggest issue here is some components are deeply nested, such as BookShelfChanger, and have to propagate the change event to Book -> BooksGrid -> Parent (App or Search)
Other issue is that shelves has to be passed along most of the components chain, because its required to visualize and to change at the book level.

## TL;DR

To get started developing right away:

- install all project dependencies with `npm install`
- start the development server with `npm start`
