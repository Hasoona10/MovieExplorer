/**
 * Previous / Next and current page display (props).
 */

export default function Pagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}) {
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Page navigation">
      <button
        type="button"
        className="pagination__btn"
        disabled={currentPage <= 1}
        onClick={onPrev}
        aria-label="Previous page"
      >
        Previous
      </button>
      <span className="pagination__info">
        Page {currentPage} of {totalPages}
      </span>
      <button
        type="button"
        className="pagination__btn"
        disabled={currentPage >= totalPages}
        onClick={onNext}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}
