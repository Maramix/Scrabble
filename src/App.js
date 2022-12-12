import "./App.css";
import Navbar from "./Navbar";
import Singleplayer from "./Singleplayer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Multiplayer from "./Multiplayer";

function App() {
  return (
    <div className="main">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/singleplayer">
            <Singleplayer />
          </Route>
          <Route exact path="/multiplayer">
            <Multiplayer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
