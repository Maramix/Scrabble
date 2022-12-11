import { useState } from "react";
import Board from "./board";
import Game from "./Game";

const Multiplayer = () => {
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  const selectOrigin = (x, y) => {
    setOrigin({ x: x, y: y });
  };

  return (
    <div>
      <br />
      <span className="game-layout">
        <Board selectOrigin={selectOrigin} />
        <Game origin={origin} selectOrigin={selectOrigin} />
      </span>
    </div>
  );
};

export default Multiplayer;
