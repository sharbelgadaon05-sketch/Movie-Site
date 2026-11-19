
import { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import MovieList from "./components/MovieList.jsx";
import { movies } from "./data/movies.js";

function App() {
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [visibleCount, setVisibleCount] = useState(4);

  const topRated = movies.filter(movie => movie.rating >= 8.7);

  const genres = movies
    .map(movie => movie.genre)
    .filter((genre, index, all) => all.indexOf(genre) === index);

  let shownMovies = movies;

  if (onlyAvailable) {
    shownMovies = shownMovies.filter(movie => movie.available);
  }

  if (selectedGenre !== "all") {
    shownMovies = shownMovies.filter(movie => movie.genre === selectedGenre);
  }

  const visibleMovies = shownMovies.slice(0, visibleCount);

  function toggleAvailable() {
    setOnlyAvailable(!onlyAvailable);
    setVisibleCount(4);
  }

  function showMore() {
    setVisibleCount(prev => prev + 4);
  }

  function showLess() {
    setVisibleCount(4);
  }

  return (
    <>
      <Header />

      <main className="page container">

        <section className="page__intro">
          <h1>הקטלוג</h1>
          <p>סרטים שכדאי לראות — הישנים הטובים והחדשים..</p>
        </section>

        <MovieList title="הכי מדורגים" movies={topRated} />

        <div className="toolbar">

          <button
            className={onlyAvailable ? "btn btn--active" : "btn"}
            onClick={toggleAvailable}
          >
            רק זמינים לצפייה
          </button>

          <span className="toolbar__divider"></span>

          <button
            className={selectedGenre === "all" ? "btn btn--active" : "btn"}
            onClick={() => {
              setSelectedGenre("all");
              setVisibleCount(4);
            }}
          >
            הכל
          </button>

          {genres.map(genre => (
            <button
              key={genre}
              className={selectedGenre === genre ? "btn btn--active" : "btn"}
              onClick={() => {
                setSelectedGenre(genre);
                setVisibleCount(4);
              }}
            >
              {genre}
            </button>
          ))}

        </div>

        <MovieList
          title={`כל הסרטים (${shownMovies.length})`}
          movies={visibleMovies}
        />

        <div className="more">

          {visibleCount < shownMovies.length && (
            <button className="btn" onClick={showMore}>
              הצג עוד
            </button>
          )}

          {visibleCount > 4 && (
            <button className="btn" onClick={showLess}>
              הצג פחות
            </button>
          )}

        </div>

      </main>

      <Footer />
    </>
  );
}

export default App;
