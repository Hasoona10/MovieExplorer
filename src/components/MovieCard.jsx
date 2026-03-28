import { getPosterSrc } from "../tmdb";

const PLACEHOLDER_POSTER =
  "https://via.placeholder.com/500x750?text=No+Poster";

export default function MovieCard({ movie }) {
  const title = movie.title || "Unknown";
  const date = movie.release_date || "";
  const rating = movie.vote_average ?? 0;
  const poster = getPosterSrc(movie) || PLACEHOLDER_POSTER;

  return (
    <article className="movie-card">
      <div className="movie-card__poster-wrap">
        <img
          className="movie-card__poster"
          src={poster}
          alt={title}
          loading="lazy"
        />
      </div>
      <div className="movie-card__body">
        <h2 className="movie-card__title">{title}</h2>
        <p className="movie-card__date">
          <strong>Release Date:</strong> {date || "—"}
        </p>
        <p className="movie-card__rating">
          <strong>Rating:</strong>{" "}
          {rating > 0 ? rating.toFixed(1) : "—"} / 10
        </p>
      </div>
    </article>
  );
}
