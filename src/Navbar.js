import "./App.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <header className="Navbar-header">Scrabble</header>
      <div className="Navbar-link">
        <Link to="/home">Home</Link>
        <Link to="/singleplayer">Singleplayer</Link>
        <Link to="/multiplayer">Multiplayer</Link>
      </div>
    </div>
  );
};

export default Navbar;
