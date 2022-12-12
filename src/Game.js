import { useEffect, useState } from "react";

const Game = ({
  availableLetters,
  setAvailableLetters,
  gameState,
  setGameState,
  origin,
  selectOrigin,
  direction,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [playerOneLetters, setPlayerOneLetters] = useState([]);
  const [playerTwoLetters, setPlayerTwoLetters] = useState([]);
  const [word, setWord] = useState([]);

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

  const handleClick = (e) => {
    if (origin.x !== 0 && direction) {
      var letter = playerOneLetters.find((ell) => ell.letter === e);

      setPlayerOneLetters(
        playerOneLetters.filter((ell) => {
          if (ell.letter !== e) {
            return true;
          } else {
            e = "";
          }
        })
      );

      console.log(letter);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    setIsLoading(true);
    let nextGameState = { ...gameState };
    nextGameState.turn++;
    nextGameState.round = Math.round(nextGameState.turn / 2);
    if (nextGameState.turn % 2 !== 0) {
      nextGameState.isPlayerOneTurn = true;
    } else {
      nextGameState.isPlayerOneTurn = false;
    }
    setGameState(nextGameState);
    selectOrigin(0, 0);
  };

  if (isLoading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  if (gameState.isPlayerOneTurn)
    return (
      <div className="player">
        <div className="board-row">
          <h1>Player One:</h1>
          <span>
            {playerOneLetters.map((tile, index) => (
              <button
                onClick={() => handleClick(tile.letter)}
                key={index}
                className="tile"
              >
                {tile.letter}
              </button>
            ))}
          </span>
          {origin.x !== 0 && (
            <form onSubmit={(e) => handleSubmit(e)}>
              {direction && <button type="submit">Sumbit</button>}
            </form>
          )}
        </div>
      </div>
    );

  if (!gameState.isPlayerOneTurn)
    return (
      <div className="player">
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
          </span>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              required
              defaultValue="write the word"
              onChange={(e) => e.target.value}
            ></input>
            {direction && <button type="submit">Sumbit</button>}
          </form>
        </div>
      </div>
    );
};

export default Game;
