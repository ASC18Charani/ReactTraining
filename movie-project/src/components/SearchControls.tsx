import { useState } from "react";
import { useMovieContext } from "../context/MovieContext";

const SearchControls: React.FC = () => {
  const { updateQuery, searchQuery, page, type, totalResults } = useMovieContext();
  const [query, setQuery] = useState<string>(searchQuery);

  const handleSearch = () => {
    updateQuery(query, 1, type); 
  };

  const resultsPerPage = 10;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

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
    <div className="search-controls">
      <div className="search-box">

      <input
        type="text"
        placeholder="Search Movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()} 
      />
      <button onClick={handleSearch}>Search</button>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => updateQuery(query, 1, type)}>
            «
          </button>
          <button disabled={page === 1} onClick={() => updateQuery(query, page - 1, type)}>
            ‹
          </button>

          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              className={page === pageNum ? "active-page" : ""}
              onClick={() => updateQuery(query, pageNum, type)}
            >
              {pageNum}
            </button>
          ))}

          <button disabled={page === totalPages} onClick={() => updateQuery(query, page + 1, type)}>
            ›
          </button>
          <button disabled={page === totalPages} onClick={() => updateQuery(query, totalPages, type)}>
            »
          </button>
        </div>
      )}

        <div className="dropdown-container">
      <select value={type} onChange={(e) => updateQuery(query, 1, e.target.value)}>
        <option value="">All</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        <option value="episode">Episodes</option>
      </select>
      </div>
    </div>
  );
};

export default SearchControls;