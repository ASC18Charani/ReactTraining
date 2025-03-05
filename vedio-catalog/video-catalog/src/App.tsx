import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
// import Home from "./pages/Home";
import './App.css';
// import MovieDetails from "./pages/MovieDetails";
// import Movies from "./pages/Movies";
import Menu from "./components/Menu";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const Movies = lazy(() => import("./pages/Movies"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));


const App: React.FC = () => {
  return (
    <Router>
      <MovieProvider>
        <Menu />
        <Suspense fallback={<p>Loading...</p>}> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
        </Suspense>
      </MovieProvider>
    </Router>
  );
};

export default App;
