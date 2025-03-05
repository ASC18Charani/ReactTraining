import { createContext, useContext, useEffect, useState } from "react";
import { Movie } from "../models/Movie";
import { fetchMovies } from "../services/movieService";
import { useNavigate, useLocation } from "react-router-dom";

interface MovieContextType {
  movies: Movie[];
  loading: boolean;
  error: string;
  totalResults: number;
  updateQuery: (search: string, page: number, type: string) => void;
  searchQuery: string;
  page: number;
  type: string;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [totalResults, setTotalResults] = useState<number>(0);

  const searchQuery = queryParams.get("s") || "";
  const page = Number(queryParams.get("p")) || 1;
  const type = queryParams.get("type") || "";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const { movies, totalResults } = await fetchMovies(searchQuery, page, type);
        setMovies(movies);
        setTotalResults(totalResults);
      } catch (err) {
        setError("Failed to fetch movies.");
      }

      setLoading(false);
    };

    fetchData();
  }, [search]);

  const updateQuery = (newSearch: string, newPage: number, newType: string) => {
    const newPath = pathname.startsWith("/movies") ? "/movies" : "/movies";
    navigate(`${newPath}?s=${newSearch}&p=${newPage}&type=${newType}`);
  };

  return (
    <MovieContext.Provider value={{ movies, loading, error, totalResults, updateQuery, searchQuery, page, type }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};
