/**
 * Hasan Ramlaoui — CPSC 349 Homework 3 (React)
 */

const API_BASE = "https://api.themoviedb.org/3";
export const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export function getApiKey() {
  const key = import.meta.env.VITE_TMDB_API_KEY;
  return key && String(key).trim() ? String(key).trim() : "";
}

function buildUrl(path, params = {}) {
  const url = new URL(API_BASE + path);
  url.searchParams.set("api_key", getApiKey());
  Object.entries(params).forEach(([k, v]) => {
    if (v != null && v !== "") url.searchParams.set(k, String(v));
  });
  return url.toString();
}

export async function fetchFromAPI(path, params = {}) {
  const res = await fetch(buildUrl(path, params));
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export async function fetchPopularMovies(page = 1) {
  const data = await fetchFromAPI("/movie/popular", { page });
  return {
    results: data.results || [],
    page: data.page ?? page,
    totalPages: data.total_pages ?? 1,
  };
}

export async function searchMovies(query, page = 1) {
  const data = await fetchFromAPI("/search/movie", { query, page });
  return {
    results: data.results || [],
    page: data.page ?? page,
    totalPages: data.total_pages ?? 1,
  };
}

export function getPosterSrc(movie) {
  if (!movie.poster_path) return null;
  return `${IMAGE_BASE}${movie.poster_path}`;
}
