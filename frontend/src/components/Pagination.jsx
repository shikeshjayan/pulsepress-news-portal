// Reusable pagination controls — shows a sliding window of page buttons (max 5 visible)
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <section className="mt-4 mb-4 flex justify-center items-center gap-1 sm:gap-2 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-500 text-white rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors cursor-pointer"
      >
        Previous
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
          className={`w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base rounded font-medium transition-colors cursor-pointer ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-500 text-white rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors cursor-pointer"
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;
