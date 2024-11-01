# Exploria

This project is a code challenge for Exploria, designed to display data in a table view with features like pagination, sorting, and filtering. Built with Vue and Nuxt.js, this application leverages search parameters to handle sorting and filtering without relying on external libraries.

## Features

- **Pagination**: Navigate through multiple pages of data.
- **Sorting**: Sort data by:
  - **Name**
  - **Date**
- **Filtering**:
  - Available on all cells through a right-click menu.
  - Filter criteria are dynamically updated based on the cell’s value.

## Project Stack

- **Vue.js**: Frontend framework for creating a reactive and maintainable UI.
- **Nuxt.js**: For seamless routing, SSR capabilities, and efficient state management.
- **No External Libraries**: The project was implemented without additional libraries to showcase custom solutions for sorting, filtering, and pagination.

## Usage

- **Sorting**: Click on the "Name" or "Date" column headers to sort the table by these fields. Sorting will update the URL search parameters to reflect the current sort state.

- **Filtering**: Right-click on any cell to open a context menu with filter options specific to that cell's value. Selecting a filter will apply it to the table and update the search parameters in the URL.

- **Pagination**: Use the pagination controls at the bottom of the table to navigate between pages. The current page is also stored in the URL search parameters for easy reference.
