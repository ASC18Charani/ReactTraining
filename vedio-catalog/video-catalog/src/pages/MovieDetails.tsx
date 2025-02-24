import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails } from "../services/movieService"; 
import { MovieDetailsType } from "../models/Movie";
const MovieDetails: React.FC = () => {
  
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movieData = await fetchMovieDetails(id as string); 
        setMovie(movieData);
      } catch (err) {
        setError("Movie details not found.");
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>No movie details found.</p>;

  const lastSearchQuery = localStorage.getItem("lastSearchQuery") || "";
  const lastSearchPage = localStorage.getItem("lastSearchPage") || "1";
  const lastSearchType = localStorage.getItem("lastSearchType") || "";

  return (
    <div className="movie-details-container">
      <Link to={`/?s=${lastSearchQuery}&p=${lastSearchPage}&type=${lastSearchType}`} className="back-button">
        ← Back to Home
      </Link>

      <div className="movie-details">
        <img src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"} alt={movie.Title} />
        <div className="movie-info">
          <h2>{movie.Title} ({movie.Year})</h2>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
