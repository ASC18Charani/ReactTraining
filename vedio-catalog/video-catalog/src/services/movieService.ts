import axios from "axios";
import { Movie, MovieDetailsType } from "../models/Movie";

const API_KEY = "c6d94035";
const BASE_URL = "https://www.omdbapi.com/";

export const fetchMovies = async (search: string, page: number, type: string): Promise<{ movies: Movie[], totalResults: number }> => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${search}&page=${page}&type=${type}`);
    if (response.data.Response === "True") {
      return {
        movies: response.data.Search,
        totalResults: Number(response.data.totalResults),
      };
    } else {
      throw new Error(response.data.Error);
    }
  } catch (error) {
    throw new Error("Failed to fetch movies.");
  }
};

export const fetchMovieDetails = async (id: string): Promise<MovieDetailsType> => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    if (response.data.Response === "True") {
      return response.data as MovieDetailsType;
    } else {
      throw new Error("Movie not found.");
    }
  } catch (error) {
    throw new Error("Failed to fetch movie details.");
  }
};
