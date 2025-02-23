import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_KEY = "c6d94035"; // Your OMDB API key

interface MovieDetailsType {
  Title: string;
  Year: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
        if (response.data.Response === "True") {
          setMovie(response.data);
        } else {
          setError("Movie details not found.");
        }
      } catch {
        setError("Error fetching movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>No movie details found.</p>;

  // ✅ Retrieve last search query from localStorage
  const lastSearchQuery = localStorage.getItem("lastSearchQuery") || "";
  const lastSearchPage = localStorage.getItem("lastSearchPage") || "1";
  const lastSearchType = localStorage.getItem("lastSearchType") || "";

  return (
    <div className="movie-details-container">
      {/* ✅ Use last search state in the "Back to Home" button */}
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
