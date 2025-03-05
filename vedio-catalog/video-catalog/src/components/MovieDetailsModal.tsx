// import { useEffect, useState } from "react";
// import { MovieDetailsType } from "../models/Movie";
// import { fetchMovieDetails } from "../services/movieService";

// interface MovieDetailsModalProps {
//   imdbID: string;
//   show: boolean;
//   onClose: () => void;
// }

// const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ imdbID, show, onClose }) => {
//   const [movie, setMovie] = useState<MovieDetailsType | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const getMovieDetails = async () => {
//       try {
//         const movieData = await fetchMovieDetails(imdbID);
//         setMovie(movieData);
//       } catch {
//         setError("Movie details not found.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (show) getMovieDetails();
//   }, [imdbID, show]);

//   const handleClose = () => {
//     onClose();
//   };

//   if (!show) return null; // ✅ Prevents rendering when closed

//   return (
//     <div className="overlay" onClick={handleClose}>
//       <div className="popup-box" onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside */}
//         <button className="close-button" onClick={handleClose}>✖</button>
//         {loading ? (
//           <p>Loading movie details...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : movie ? (
//           <>
//             <h2>{movie.Title} ({movie.Year})</h2>
//             <img
//               src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
//               alt={movie.Title}
//               className="popup-image"
//             />
//             <p><strong>Genre:</strong> {movie.Genre}</p>
//             <p><strong>Director:</strong> {movie.Director}</p>
//             <p><strong>Actors:</strong> {movie.Actors}</p>
//             <p><strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}</p>
//             <p><strong>Plot:</strong> {movie.Plot}</p>
//           </>
//         ) : (
//           <p>No movie details found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MovieDetailsModal;


import { MovieDetailsType } from "../models/Movie";

interface MovieDetailsModalProps {
  show: boolean;
  movie: MovieDetailsType | null;
  onClose: () => void;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ show, movie, onClose }) => {
  if (!show) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✖</button>
        {movie ? (
          <>
            <h2>{movie.Title} ({movie.Year})</h2>
            <img src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"} alt={movie.Title} className="popup-image" />
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
          </>
        ) : (
          <p>Loading movie details...</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsModal;
