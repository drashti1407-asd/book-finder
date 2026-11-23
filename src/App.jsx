
import { useState } from "react";
import "./App.css";

function BookCard({ book }) {
  const [imageFailed, setImageFailed] = useState(false);

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg?default=false`
    : "";

  return (
    <article className="book-card">
      <div className="book-cover">
        {coverUrl && !imageFailed ? (
          <img
            src={coverUrl}
            alt={`Cover of ${book.title || "book"}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="cover-placeholder">
            <span className="placeholder-icon">▤</span>
            <span>Cover unavailable</span>
          </div>
        )}
      </div>

      <div className="book-info">
        <h3>{book.title || "Title unavailable"}</h3>

        <p className="book-author">
          {book.author_name?.join(", ") || "Unknown author"}
        </p>

        <div className="book-details">
          <div>
            <span>First published</span>
            <strong>{book.first_publish_year || "Unknown"}</strong>
          </div>

          <div>
            <span>Editions</span>
            <strong>{book.edition_count ?? "Unknown"}</strong>
          </div>

          <div>
            <span>Cover ID</span>
            <strong>{book.cover_i ?? "Unavailable"}</strong>
          </div>
        </div>
      </div>
    </article>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const searchBooks = async (event) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setError("Please enter a book title.");
      setBooks([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError("");
    setBooks([]);
    setHasSearched(true);

    try {
      const url = new URL("https://openlibrary.org/search.json");

      url.searchParams.set("q", searchTerm.trim());
      url.searchParams.set(
        "fields",
        "title,author_name,first_publish_year,cover_i,edition_count"
      );
      url.searchParams.set("limit", "12");

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Unable to fetch books. Please try again.");
      }

      const data = await response.json();

      if (!Array.isArray(data.docs)) {
        throw new Error("Unexpected API response format.");
      }

      setBooks(data.docs);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="navbar">
        <a href="#" className="logo">
          <span className="logo-icon">B</span>
          BookFinder<span className="logo-dot">.</span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#search">Find Books</a>
          <a href="#results">Discover</a>
        </nav>

        <a href="#search" className="nav-button">
          Explore Books
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              YOUR NEXT CHAPTER STARTS HERE
            </span>

            <h1>
              Discover books.
              <br />
              <span>Explore new worlds.</span>
            </h1>

            <p>
              Find your next favourite read from thousands
              of books available through Open Library.
            </p>

            <a href="#search" className="hero-button">
              Start Exploring <span>→</span>
            </a>
          </div>

          <div className="hero-decoration">
            <div className="decoration-circle circle-one"></div>
            <div className="decoration-circle circle-two"></div>
            <div className="floating-book book-one">BOOKS</div>
            <div className="floating-book book-two">READ</div>
            <div className="floating-book book-three">EXPLORE</div>
          </div>
        </section>

        <section className="search-section" id="search">
          <div className="section-heading">
            <span className="eyebrow">BOOK DISCOVERY</span>
            <h2>Find Your Next Read</h2>
            <p>What would you like to read today?</p>
          </div>

          <form className="search-form" onSubmit={searchBooks}>
            <div className="search-input-wrapper">
              <span className="search-icon">⌕</span>

              <input
                type="text"
                placeholder="Search by book title..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search Books"}
              <span>→</span>
            </button>
          </form>
        </section>

        <section className="results-section" id="results">
          {loading && (
            <div className="status-message">
              <div className="loader"></div>
              <p>Finding your books...</p>
            </div>
          )}

          {error && !loading && (
            <div className="status-message error-message">
              <span>!</span>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && hasSearched && books.length === 0 && (
            <div className="status-message">
              <span className="empty-icon">⌕</span>
              <h3>No books found</h3>
              <p>Try another title to discover more books.</p>
            </div>
          )}

          {!loading && books.length > 0 && (
            <>
              <div className="results-heading">
                <div>
                  <span className="eyebrow">YOUR SEARCH RESULTS</span>
                  <h2>Books to Explore</h2>
                </div>

                <span className="result-count">
                  {books.length} books shown
                </span>
              </div>

              <div className="book-grid">
                {books.map((book, index) => (
                  <BookCard
                    key={`${book.title || "book"}-${index}`}
                    book={book}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="logo">
          <span className="logo-icon">B</span>
          BookFinder<span className="logo-dot">.</span>
        </a>

        <p>Discover something wonderful. One book at a time.</p>

        <span>Book information powered by Open Library.</span>
      </footer>
    </div>
  );
}

export default App;
