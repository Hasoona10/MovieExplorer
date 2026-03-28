/**
 * Header with title, search input, and sort dropdown (controlled via props).
 */

export default function Header({
  searchValue,
  onSearchChange,
  onSearchKeyDown,
  sortBy,
  onSortChange,
}) {
  return (
    <header className="header">
      <h1 className="header__title">Movie Explorer</h1>
      <div className="header__controls">
        <input
          type="text"
          className="header__search"
          placeholder="Search for a movie..."
          aria-label="Search for a movie by title"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={onSearchKeyDown}
        />
        <div className="header__sort-wrap">
          <select
            id="sort-by"
            className="header__sort"
            aria-label="Sort movies"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="release_date_asc">Release Date (Asc)</option>
            <option value="release_date_desc">Release Date (Desc)</option>
            <option value="rating_asc">Rating (Asc)</option>
            <option value="rating_desc">Rating (Desc)</option>
          </select>
        </div>
      </div>
    </header>
  );
}
