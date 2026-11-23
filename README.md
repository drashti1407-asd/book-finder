
# Book Finder

A simple and responsive Book Finder application built using React.js and Vite. It allows users to search for books and view book details using the Open Library API.

## Features

- Search books by title.
- Display book titles and author names.
- Show first publication year.
- Display edition count.
- Show actual book cover images when available.
- Handle missing book covers.
- Display loading and error messages.
- Handle empty searches and no results.
- Responsive design for different screen sizes.
- Soft Lavender & Cream pastel color theme.

## Technologies Used

- React.js
- Vite
- JavaScript
- HTML
- CSS
- Open Library API

## API Documentation

Official documentation:

https://openlibrary.org/dev/docs/api/search

### API Endpoint

`https://openlibrary.org/search.json`

### HTTP Method

GET

### Parameters Used

| Parameter | Purpose |
|---|---|
| q | Search for books |
| fields | Select book information |
| limit | Set the maximum number of results |

### Book Cover API

`https://covers.openlibrary.org/b/id/{cover_i}-M.jpg?default=false`

## Installation and Setup

1. Clone this repository:

```bash
git clone https://github.com/drashti1407-asd/book-finder.git
```

2. Open the project folder:

```bash
cd book-finder
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL displayed in your terminal.

## Project Structure

```text
book-finder/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## AI Code Verification

The API endpoint, HTTP method, parameters, response fields, and book cover integration were checked against the official Open Library documentation.

Refer to `AI_MISTAKES.md` for the API verification and testing results.


