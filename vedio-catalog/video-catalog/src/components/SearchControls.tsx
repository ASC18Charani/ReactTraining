import React, { useState } from "react"; 
import { useMovieContext } from "../context/MovieContext";

const SearchControls: React.FC = () => {
  const { searchQuery, type, updateQuery } = useMovieContext();
  const [search, setSearch] = useState(searchQuery);

  const handleSearch = () => {
    updateQuery(search, 1, type); 
  };

  return (
    <div className="search-controls">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search Movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()} 
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      <div className="dropdown-container">
        <select value={type} onChange={(e) => updateQuery(search, 1, e.target.value)}>
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
