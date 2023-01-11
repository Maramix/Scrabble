import { useState } from "react";
import allLetters from "./Data/letterdb";
import Board from "./board";
import GameBar from "./GameBar";
import Game from "./Game";
import { boardValues, toggleVisibilityByClassName } from "./utility";

const Multiplayer = ({ language }) => {
  const [boardCoordinates, setBoardCoordinates] = useState(boardValues());
  const [availableLetters, setAvailableLetters] = useState(
    allLetters(language)
  );
  const [gameState, setGameState] = useState({
    turn: 1,
    round: 1,
    isPlayerOneTurn: true,
    currentScore: 0,
    scorePlayerOne: 0,
    scorePlayerTwo: 0,
  });
  const [origin, setOrigin] = useState();
  const [direction, setDirection] = useState(undefined);
  const [word, setWord] = useState([]);
  const [wordMultiplier, setWordMultiplier] = useState(1);

  return (
    <div className="game-container">
      <div className="handover-container">
        <div className="handover-box">
          <p>
            Hand the device over to player{" "}
            {gameState.isPlayerOneTurn ? "One" : "Two"}
          </p>
          <button
            onClick={() => toggleVisibilityByClassName("handover-container")}
          >
            Ok!
          </button>
        </div>
      </div>
      <GameBar
        availableLetters={availableLetters}
        gameState={gameState}
        origin={origin}
        direction={direction}
        setDirection={setDirection}
        wordMultiplier={wordMultiplier}
        word={word}
      />
      <Board
        boardCoordinates={boardCoordinates}
        setOrigin={setOrigin}
        origin={origin}
        word={word}
      />
      <Game
        language={language}
        boardCoordinates={boardCoordinates}
        setBoardCoordinates={setBoardCoordinates}
        availableLetters={availableLetters}
        setAvailableLetters={setAvailableLetters}
        gameState={gameState}
        setGameState={setGameState}
        origin={origin}
        setOrigin={setOrigin}
        direction={direction}
        setDirection={setDirection}
        word={word}
        setWord={setWord}
        wordMultiplier={wordMultiplier}
        setWordMultiplier={setWordMultiplier}
      />
    </div>
  );
};

export default Multiplayer;
