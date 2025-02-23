import MovieList from "../components/MovieList";
import SearchControls from "../components/SearchControls";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Video Catalog</h1>
      <SearchControls />
      <MovieList />
    </div>
  );
};

export default Home;
