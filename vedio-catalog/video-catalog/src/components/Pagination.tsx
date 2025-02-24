import React from "react";
import { useMovieContext } from "../context/MovieContext";

const Pagination: React.FC = () => {
  const { totalResults, page, searchQuery, type, updateQuery } = useMovieContext();
  const resultsPerPage = 10;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const maxPagesToShow = 10;
    let startPage = Math.max(1, page - 5);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => updateQuery(searchQuery, 1, type)}>«</button>
      <button disabled={page === 1} onClick={() => updateQuery(searchQuery, page - 1, type)}>‹</button>

      {getPageNumbers().map((pageNum) => (
        <button
          key={pageNum}
          className={page === pageNum ? "active-page" : ""}
          onClick={() => updateQuery(searchQuery, pageNum, type)}
        >
          {pageNum}
        </button>
      ))}

      <button disabled={page === totalPages} onClick={() => updateQuery(searchQuery, page + 1, type)}>›</button>
      <button disabled={page === totalPages} onClick={() => updateQuery(searchQuery, totalPages, type)}>»</button>
    </div>
  );
};

export default Pagination;
