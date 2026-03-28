/**
 * Sort options aligned with course demo: date/rating asc & desc.
 */

const DATE_OLD = "0000-00-00";
const DATE_END = "9999-12-31";

export function sortMovies(movies, sortBy) {
  const copy = [...movies];
  switch (sortBy) {
    case "release_date_asc":
      copy.sort((a, b) => {
        const da = a.release_date || DATE_END;
        const db = b.release_date || DATE_END;
        return da.localeCompare(db);
      });
      break;
    case "release_date_desc":
      copy.sort((a, b) => {
        const da = a.release_date || DATE_OLD;
        const db = b.release_date || DATE_OLD;
        return db.localeCompare(da);
      });
      break;
    case "rating_asc":
      copy.sort((a, b) => (a.vote_average ?? 0) - (b.vote_average ?? 0));
      break;
    case "rating_desc":
      copy.sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0));
      break;
    default:
      break;
  }
  return copy;
}
