import "./App.css";
import { Link } from "react-router-dom";

const Navbar = ({ setLanguage }) => {
  return (
    <div className="navbar-container">
      <header> SCRABBLE </header>
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
      <ul className="navbar-links">
        <li>
          <Link to="/home">
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link to="/singleplayer">
            <p>Singleplayer</p>
          </Link>
        </li>
        <li onClick={() => setLanguage()}>
          <Link to="/multiplayer">
            <p>Multiplayer</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
