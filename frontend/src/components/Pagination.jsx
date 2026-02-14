const Pagination = ({ page, pages, setPage }) => {
  if (pages <= 1) return null;

  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-4 py-2 bg-gray-200 rounded"
      >
        Prev
      </button>

      <span className="px-4 py-2">
        {page} / {pages}
      </span>

      <button
        disabled={page === pages}
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 bg-gray-200 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
