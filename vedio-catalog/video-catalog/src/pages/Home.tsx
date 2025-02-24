import React from "react";
import MovieList from "../components/MovieList";
import SearchControls from "../components/SearchControls";
import Pagination from "../components/Pagination";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Video Catalog</h1>
      <SearchControls />
      <Pagination />
      <MovieList />
    </div>
  );
};

export default Home;
