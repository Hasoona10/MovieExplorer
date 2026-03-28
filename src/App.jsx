/**
 * CPSC 349 Homework 3 — Movie Explorer (React)
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header.jsx";
import MovieCard from "./components/MovieCard.jsx";
import Pagination from "./components/Pagination.jsx";
import { sortMovies } from "./sortMovies.js";
import {
  fetchPopularMovies,
  getApiKey,
  searchMovies,
} from "./tmdb.js";
import "./App.css";

const SEARCH_DEBOUNCE_MS = 350;

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debounceRef = useRef(null);

  const loadPage = useCallback(async (page, query) => {
    const key = getApiKey();
    if (!key) {
      setError(
        "Use api key from movie db site."
      );
      setLoading(false);
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data =
        query.trim().length > 0
          ? await searchMovies(query.trim(), page)
          : await fetchPopularMovies(page);
      setMovies(data.results);
      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message || "Failed to load movies.");
      setMovies([]);
      setTotalPages(1);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPage(1, activeQuery);
  }, [activeQuery, loadPage]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const sortedMovies = useMemo(
    () => sortMovies(movies, sortBy),
    [movies, sortBy]
  );

  function scheduleSearchFromInput(value) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setActiveQuery(value.trim());
    }, SEARCH_DEBOUNCE_MS);
  }

  function handleSearchChange(value) {
    setSearchInput(value);
    scheduleSearchFromInput(value);
  }

  function handleSearchKeyDown(e) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const q = searchInput.trim();
    if (q === activeQuery) loadPage(1, q);
    else setActiveQuery(q);
  }

  function handlePrev() {
    if (currentPage <= 1) return;
    loadPage(currentPage - 1, activeQuery);
  }

  function handleNext() {
    if (currentPage >= totalPages) return;
    loadPage(currentPage + 1, activeQuery);
  }

  const showNoResults = !loading && !error && sortedMovies.length === 0;

  return (
    <>
      <Header
        searchValue={searchInput}
        onSearchChange={handleSearchChange}
        onSearchKeyDown={handleSearchKeyDown}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <main className="main">
        {loading && <p className="loading">Loading...</p>}
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        {!loading && !error && (
          <>
            <div className="movie-grid" aria-live="polite">
              {sortedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            {showNoResults && (
              <p className="no-results">
                No movies found. Try a different search.
              </p>
            )}
          </>
        )}

        {!loading && !error && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </main>
    </>
  );
}
