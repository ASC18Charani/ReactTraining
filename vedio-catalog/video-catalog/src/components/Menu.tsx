import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Menu = () => {
  const navigate = useNavigate(); // ✅ Use navigate for button clicks

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container className="navbar-container">
        <span className="navbar-title" onClick={() => navigate("/")}>
          Video Catalog App
        </span>

        <div className="nav-buttons">
          <span className="nav-button" onClick={() => navigate("/")}>Home</span>
          <span className="nav-button" onClick={() => navigate("/movies")}>Movies</span>
        </div>
      </Container>
    </Navbar>
  );
};

export default Menu;
