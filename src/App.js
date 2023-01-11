import "./App.css";
import "./swal.css";
import Navbar from "./Navbar";
import Singleplayer from "./Singleplayer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Multiplayer from "./Multiplayer";
import { useState } from "react";
import polishFlag from "./Data/images/flagPoland.png";
import britishFlag from "./Data/images/flagBritain.png";

function App() {
  const [language, setLanguage] = useState();
  return (
    <div className="main-container">
      <Router>
        <Navbar setLanguage={setLanguage} />
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/singleplayer">
            <Singleplayer />
          </Route>
          <Route exact path="/multiplayer">
            {language ? (
              <Multiplayer
                className="multiplier-container"
                language={language}
              />
            ) : (
              <div className="language-selection">
                <h1>Choose the alphabet</h1>
                <img
                  src={polishFlag}
                  alt="Logo"
                  onClick={() => setLanguage("polish")}
                />
                <img
                  src={britishFlag}
                  alt="Logo"
                  onClick={() => setLanguage("english")}
                />
              </div>
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
