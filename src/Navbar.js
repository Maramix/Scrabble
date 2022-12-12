import "./App.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="Navbar">
      <header className="Navbar-title"> SCRABBLE </header>
      <div className="Navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/singleplayer">Singleplayer</Link>
        <Link to="/multiplayer">Multiplayer</Link>
      </div>
    </div>
  );
};

export default Navbar;
