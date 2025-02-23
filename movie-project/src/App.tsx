import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import Home from "./pages/Home";
import './App.css';
import MovieDetails from "./pages/MovieDetails";

const App: React.FC = () => {
  return (
    <Router>
      <MovieProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </MovieProvider>
    </Router>
  );
};

export default App;
