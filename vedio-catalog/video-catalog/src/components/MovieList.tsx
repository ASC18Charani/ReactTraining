// import { Link } from "react-router-dom";
// import { useMovieContext } from "../context/MovieContext";
// import { Movie } from "../models/Movie"; 

// const MovieList: React.FC = () => {
//   const { movies, loading, error, totalResults, searchQuery, page, type } = useMovieContext();

//   if (!searchQuery) return <p className="info-message">Type something in the search bar to find movies!</p>;
//   if (loading) return <p className="info-message">Loading movies...</p>;
//   if (error) return <p className="info-message">Error: {error}</p>;

//   const handleMovieClick = (imdbID: string) => {
//     localStorage.setItem("lastSearchQuery", searchQuery);
//     localStorage.setItem("lastSearchPage", page.toString());
//     localStorage.setItem("lastSearchType", type);
//   };

//   return (
//     <div className="movie-table-container">
//       <p className="results-info">Total Results: {totalResults}</p>
//       <table className="movie-table">
//         <thead>
//           <tr>
//             <th className="poster-column">Poster</th>
//             <th>Title</th>
//             <th className="year-column">Year</th>
//             <th className="type-column">Type</th>
//           </tr>
//         </thead>
//         <tbody>
//           {movies.map((movie: Movie) => (
//             <tr key={movie.imdbID}>
//               <td className="poster-column">
//                 <img
//                   src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
//                   alt={movie.Title}
//                   className="movie-poster"
//                 />
//               </td>
//               <td>
//                 <Link to={`/movie/${movie.imdbID}`} onClick={() => handleMovieClick(movie.imdbID)} className="movie-link">
//                   {movie.Title}
//                 </Link>
//               </td>
//               <td className="year-column">{movie.Year}</td>
//               <td className="type-column">{movie.Type}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MovieList;


import { useState } from "react";
import { useMovieContext } from "../context/MovieContext";
import { Movie, MovieDetailsType } from "../models/Movie";
import MovieDetailsModal from "./MovieDetailsModal";
import { fetchMovieDetails } from "../services/movieService";

const MovieList: React.FC = () => {
  const { movies, loading, error, totalResults, searchQuery } = useMovieContext();
  const [selectedMovie, setSelectedMovie] = useState<MovieDetailsType | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleMovieClick = async (movie: Movie) => {
    setShowModal(true); 
    
    try {
      const movieDetails = await fetchMovieDetails(movie.imdbID);
      setSelectedMovie(movieDetails); 
    } catch {
      setSelectedMovie(null);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  if (!searchQuery) return <p className="info-message">Type something in the search bar to find movies!</p>;
  if (loading) return <p className="info-message">Loading movies...</p>;
  if (error) return <p className="info-message">Error: {error}</p>;

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
          {movies.map((movie: Movie) => (
            <tr key={movie.imdbID} onClick={() => handleMovieClick(movie)} style={{ cursor: "pointer" }}>
              <td className="poster-column">
                <img src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"} alt={movie.Title} className="movie-poster" />
              </td>
              <td>
                <span className="movie-link">{movie.Title}</span>
              </td>
              <td className="year-column">{movie.Year}</td>
              <td className="type-column">{movie.Type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <MovieDetailsModal show={showModal} movie={selectedMovie} onClose={handleCloseModal} />
    </div>
  );
};

export default MovieList;

