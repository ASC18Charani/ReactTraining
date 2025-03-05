import React from "react";
// import MovieList from "../components/MovieList";
// import SearchControls from "../components/SearchControls";
// import Pagination from "../components/Pagination";

const Home: React.FC = () => {
  return (
    // <div>
    //   <h1>Video Catalog</h1>
    //   {/* <SearchControls />
    //   <Pagination />
    //   <MovieList /> */}
    // </div>

    <div className="home-container">
      <h1>Welcome to the Video Catalog App! 🎬</h1>
      <p className="welcome-text">
        Discover a vast collection of movies and TV series. Use the search bar to find your favorite films, 
        explore different categories, and enjoy seamless navigation with our intuitive design.
      </p>
      <p className="welcome-text">
        Click on <strong>"Movies"</strong> in the menu to start browsing now!
      </p>
    </div>
  );
};

export default Home;
