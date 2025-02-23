import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// Define types
interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

interface OMDBResponse {
  Response: "True" | "False";
  Search?: Movie[];
  totalResults?: string;
  Error?: string;
}

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
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [totalResults, setTotalResults] = useState<number>(0);

  const API_KEY = "c6d94035"; // Your OMDB API Key

  // Set search query dynamically (default is empty, so user must enter a name)
  const searchQuery: string = queryParams.get("s") || "";
  const page: number = Number(queryParams.get("p")) || 1;
  const type: string = queryParams.get("type") || "";

  const fetchMovies = async () => {
    if (!searchQuery) return; // Don't fetch if search is empty

    setLoading(true);
    setError("");

    try {
      const response = await axios.get<OMDBResponse>(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}&page=${page}&type=${type}`
      );

      if (response.data.Response === "True") {
        setMovies(response.data.Search || []);
        setTotalResults(Number(response.data.totalResults) || 0);
      } else {
        setError(response.data.Error || "No results found.");
        setMovies([]); // Clear previous results
      }
    } catch (err) {
      setError("Failed to fetch movies.");
      setMovies([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [search]);

  const updateQuery = (newSearch: string, newPage: number, newType: string) => {
    navigate(`/?s=${newSearch}&p=${newPage}&type=${newType}`);
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
