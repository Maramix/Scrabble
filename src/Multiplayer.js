import { useState } from "react";
import allLetters from "./Data/letterdb";
import Board from "./board";
import GameBar from "./GameBar";
import Game from "./Game";

const Multiplayer = () => {
  const [availableLetters, setAvailableLetters] = useState(allLetters());
  const [gameState, setGameState] = useState({
    turn: 1,
    round: 1,
    isPlayerOneTurn: true,
    currentScore: 0,
    scorePlayerOne: 0,
    scorePlayerTwo: 0,
  });
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState(undefined);
  const selectOrigin = (x, y) => {
    setOrigin({ x: x, y: y });
  };

  return (
    <div>
      <br />
      <span className="game-layout">
        <Board selectOrigin={selectOrigin} />
        <GameBar
          availableLetters={availableLetters}
          gameState={gameState}
          origin={origin}
          direction={direction}
          setDirection={setDirection}
        />
        <Game
          availableLetters={availableLetters}
          setAvailableLetters={setAvailableLetters}
          gameState={gameState}
          setGameState={setGameState}
          origin={origin}
          selectOrigin={selectOrigin}
          direction={direction}
        />
      </span>
    </div>
  );
};

export default Multiplayer;
