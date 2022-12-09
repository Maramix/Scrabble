import { useEffect, useState } from "react";
import allLetters from "./Data/letterdb";

const Game = () => {
  const [availableLetters, setAvailableLetters] = useState(allLetters());
  const [handPlayerOne, setHandPlayerOne] = useState([]);
  const [handPlayerTwo, setHandPlayerTwo] = useState([]);
  const [gameState, setGameState] = useState({
    turn: 1,
    round: 1,
    isPlayerOneTurn: true,
    currentScore: 0,
    scorePlayerOne: 0,
    scorePlayerTwo: 0,
  });

  function setPlayerHand(playerHand) {
    let randomIndex;
    let availableLettersReduced = availableLetters;
    console.log(playerHand.length);
    for (let i = playerHand.length; i < 7; i++) {
      randomIndex = Math.floor(Math.random() * availableLettersReduced.length);
      playerHand.push(availableLettersReduced[randomIndex]);
      availableLettersReduced.splice(randomIndex, 1);
      console.log("item added");
    }
    setAvailableLetters(availableLettersReduced);
    return playerHand;
  }

  useEffect(() => {
    setHandPlayerOne(setPlayerHand(handPlayerOne));
    setHandPlayerTwo(setPlayerHand(handPlayerTwo));
    //console.log(availableLetters, handPlayerOne, handPlayerTwo);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let nextGameState = { ...gameState };
    nextGameState.turn++;
    nextGameState.currentScore++;
    nextGameState.round = Math.round(nextGameState.turn / 2);
    if (nextGameState.turn % 2 !== 0) {
      nextGameState.isPlayerOneTurn = true;
    } else {
      nextGameState.isPlayerOneTurn = false;
    }
    setGameState(nextGameState);
    //console.log(gameState);
  };

  return (
    <div>
      <p>Round: {gameState.round}</p>
      {gameState.isPlayerOneTurn && (
        <div className="board-row">
          <h1>Player one:</h1>
          <span>
            {handPlayerOne.map((tile, index) => (
              <p key={index} className="tile">
                {tile.letter}
              </p>
            ))}
            <p>Score: {gameState.scorePlayerOne}</p>
          </span>
          <form>
            <input
              defaultValue="write the word"
              onChange={(e) => e.target.value}
            ></input>
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Sumbit
            </button>
          </form>
        </div>
      )}
      {!gameState.isPlayerOneTurn && (
        <div>
          <h1>Player Two:</h1>
          <span>
            {handPlayerTwo.map((tile, index) => (
              <p key={index} className="tile">
                {tile.letter}
              </p>
            ))}
            <p>Score: {gameState.scorePlayerOne}</p>
          </span>
          <form>
            <input onChange={(e) => e.target.value}></input>
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Sumbit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Game;
