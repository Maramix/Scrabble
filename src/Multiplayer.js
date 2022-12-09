import Board from "./board";
import Game from "./Game";

const Multiplayer = () => {
  return (
    <div>
      <br />
      <span className="game-layout">
        <Board />
        <Game />
      </span>
    </div>
  );
};

export default Multiplayer;
