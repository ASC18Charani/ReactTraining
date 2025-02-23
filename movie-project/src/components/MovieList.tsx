import { Link } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";

const MovieList: React.FC = () => {
  const { movies, loading, error, totalResults, searchQuery, page, type } = useMovieContext();

  if (!searchQuery) return <p className="info-message">Type something in the search bar to find movies!</p>;
  if (loading) return <p className="info-message">Loading movies...</p>;
  if (error) return <p className="info-message">Error: {error}</p>;

  const handleMovieClick = (imdbID: string) => {
    // ✅ Store search query, page, and type in local storage
    localStorage.setItem("lastSearchQuery", searchQuery);
    localStorage.setItem("lastSearchPage", page.toString());
    localStorage.setItem("lastSearchType", type);
  };

  return (
    <div className="movie-table-container">
      <p className="results-info">Total Results: {totalResults}</p>
      <table className="movie-table">
        <thead>
          <tr>
            <th className="poster-column">Poster</th>
            <th>Title</th>
            <th className="year-column">Year</th>
            <th className="type-column">Type</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.imdbID}>
              <td className="poster-column">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
                  alt={movie.Title}
                  className="movie-poster"
                />
              </td>
              <td>
                {/* ✅ Save search state before navigating */}
                <Link to={`/movie/${movie.imdbID}`} onClick={() => handleMovieClick(movie.imdbID)} className="movie-link">
                  {movie.Title}
                </Link>
              </td>
              <td className="year-column">{movie.Year}</td>
              <td className="type-column">{movie.Type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;
