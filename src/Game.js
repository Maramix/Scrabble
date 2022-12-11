import { useEffect, useState } from "react";
import allLetters from "./Data/letterdb";

const Game = ({ origin, selectOrigin }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [availableLetters, setAvailableLetters] = useState(allLetters());
  const [playerOneLetters, setPlayerOneLetters] = useState([]);
  const [playerTwoLetters, setPlayerTwoLetters] = useState([]);
  const [gameState, setGameState] = useState({
    turn: 1,
    round: 1,
    isPlayerOneTurn: true,
    currentScore: 0,
    scorePlayerOne: 0,
    scorePlayerTwo: 0,
  });

  function assingLettersToPlayer(playerLetters) {
    let playerHand = playerLetters;
    let numberOfLettersToAdd = 7 - playerHand.length;
    let availableLettersreduced = availableLetters;
    while (numberOfLettersToAdd > 0) {
      playerHand.push(availableLettersreduced.pop());
      numberOfLettersToAdd--;
    }
    setAvailableLetters(availableLettersreduced);
    if (gameState.isPlayerOneTurn) setPlayerOneLetters(playerHand);
    if (!gameState.isPlayerOneTurn) setPlayerTwoLetters(playerHand);
  }
  //assigning letters to players and removing letters from availableLetters
  useEffect(() => {
    if (gameState.isPlayerOneTurn) assingLettersToPlayer(playerOneLetters);
    if (!gameState.isPlayerOneTurn) assingLettersToPlayer(playerTwoLetters);
    setIsLoading(false);
    // eslint-disable-next-line
  }, [gameState.turn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    setIsLoading(true);
    let nextGameState = { ...gameState };
    nextGameState.turn++;
    //nextGameState.currentScore++;
    nextGameState.round = Math.round(nextGameState.turn / 2);
    if (nextGameState.turn % 2 !== 0) {
      nextGameState.isPlayerOneTurn = true;
    } else {
      nextGameState.isPlayerOneTurn = false;
    }
    setGameState(nextGameState);
    selectOrigin(0, 0);
  };

  console.log(origin);

  if (isLoading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  if (gameState.isPlayerOneTurn)
    return (
      <div className="player">
        <p>Round: {gameState.round}</p>
        {origin.x === 0 && <p> Select origin</p>}
        <br />
        <div className="board-row">
          <h1>Player One:</h1>
          <span>
            {playerOneLetters.map((tile, index) => (
              <p key={index} className="tile">
                {tile.letter}
              </p>
            ))}
            <p>Score: {gameState.scorePlayerOne}</p>
          </span>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              defaultValue="write the word"
              onChange={(e) => e.target.value}
            ></input>
            <button type="submit">Sumbit</button>
          </form>
        </div>
      </div>
    );

  if (!gameState.isPlayerOneTurn)
    return (
      <div className="player">
        <p>Round: {gameState.round}</p>
        {origin.x === 0 && <p> Select origin</p>}
        <br />
        <div className="board-row">
          <h1>Player Two:</h1>
          <span>
            {playerTwoLetters.map((tile, index) => (
              <button
                onClick={() => console.log("elo")}
                key={index}
                className="tile"
              >
                {tile.letter}
              </button>
            ))}
            <p>Score: {gameState.scorePlayerOne}</p>
          </span>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input onChange={(e) => e.target.value}></input>
            <button type="submit">Sumbit</button>
          </form>
        </div>
      </div>
    );
};

export default Game;
