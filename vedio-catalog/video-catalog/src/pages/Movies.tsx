import React, { lazy, Suspense } from "react";
// import MovieList from "../components/MovieList";
// import SearchControls from "../components/SearchControls";
// import Pagination from "../components/Pagination";

const MovieList = lazy(() => import("../components/MovieList"));
const SearchControls = lazy(() => import("../components/SearchControls"));
const Pagination = lazy(() => import("../components/Pagination"));

const Movies: React.FC = () => {
  return (
    <div className="movies-container">
      <h1>Movies</h1>
      <Suspense fallback={<p>Loading...</p>}> 
      <SearchControls />
      <Pagination />
      <MovieList />
      </Suspense>
    </div>
  );
};

export default Movies;
