import { useState } from "react";
import allLetters from "./Data/letterdb";
import Board from "./board";
import GameBar from "./GameBar";
import Game from "./Game";

const Multiplayer = () => {
  const [boardCoordinates, setBoardCoordinates] = useState([
    ["TWS", "", "", "DLS", "", "", "", "TWS", "", "", "", "DLS", "", "", "TWS"],
    ["", "DWS", "", "", "", "TLS", "", "", "", "TLS", "", "", "", "DWS", ""],
    ["", "", "DWS", "", "", "", "DLS", "", "DLS", "", "", "", "DWS", "", ""],
    ["DLS", "", "", "DWS", "", "", "", "DLS", "", "", "", "DWS", "", "", "DLS"],
    ["", "", "", "", "DWS", "", "", "", "", "", "DWS", "", "", "", ""],
    ["", "TLS", "", "", "", "TLS", "", "", "", "TLS", "", "", "", "TLS", ""],
    ["", "", "DLS", "", "", "", "DLS", "", "DLS", "", "", "", "DLS", "", ""],
    [
      "TWS",
      "",
      "",
      "DLS",
      "",
      "",
      "",
      String.fromCharCode(9734),
      "",
      "",
      "",
      "DLS",
      "",
      "",
      "TWS",
    ],
    ["", "", "DLS", "", "", "", "DLS", "", "DLS", "", "", "", "DLS", "", ""],
    ["", "TLS", "", "", "", "TLS", "", "", "", "TLS", "", "", "", "TLS", ""],
    ["", "", "", "", "DWS", "", "", "", "", "", "DWS", "", "", "", ""],
    ["DLS", "", "", "DWS", "", "", "", "DLS", "", "", "", "DWS", "", "", "DLS"],
    ["", "", "DWS", "", "", "", "DLS", "", "DLS", "", "", "", "DWS", "", ""],
    ["", "DWS", "", "", "", "TLS", "", "", "", "TLS", "", "", "", "DWS", ""],
    ["TWS", "", "", "DLS", "", "", "", "TWS", "", "", "", "DLS", "", "", "TWS"],
  ]);

  const [availableLetters, setAvailableLetters] = useState(allLetters());
  const [gameState, setGameState] = useState({
    turn: 1,
    round: 1,
    isPlayerOneTurn: true,
    currentScore: 0,
    scorePlayerOne: 0,
    scorePlayerTwo: 0,
  });
  const [origin, setOrigin] = useState([null, null]);
  const [direction, setDirection] = useState(undefined);
  const [word, setWord] = useState([]);

  const selectOrigin = (x, y) => {
    setOrigin([x, y]);
  };

  return (
    <div>
      <br />
      <span className="game-layout">
        <Board
          boardCoordinates={boardCoordinates}
          selectOrigin={selectOrigin}
        />
        <GameBar
          availableLetters={availableLetters}
          gameState={gameState}
          origin={origin}
          direction={direction}
          setDirection={setDirection}
        />
        <Game
          boardCoordinates={boardCoordinates}
          setBoardCoordinates={setBoardCoordinates}
          availableLetters={availableLetters}
          setAvailableLetters={setAvailableLetters}
          gameState={gameState}
          setGameState={setGameState}
          origin={origin}
          selectOrigin={selectOrigin}
          direction={direction}
          setDirection={setDirection}
          word={word}
          setWord={setWord}
        />
      </span>
    </div>
  );
};

export default Multiplayer;
