import { useEffect, useState } from "react";
import Player from "./Player";
import { boardValues, deepClone } from "./utility";

const Game = ({
  boardCoordinates,
  setBoardCoordinates,
  availableLetters,
  setAvailableLetters,
  gameState,
  setGameState,
  origin,
  setOrigin,
  direction,
  setDirection,
  wordMultiplier,
  setWordMultiplier,
  word,
  setWord,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [playerOneLetters, setPlayerOneLetters] = useState([]);
  const [playerTwoLetters, setPlayerTwoLetters] = useState([]);
  const [isPlacedCorrectly, setIsPlacedCorectly] = useState(true);
  const [currentPlayerInitialLetters, setCurrentPlayerInitialLetters] =
    useState([]);
  const [tempCoordinates, setTempCoordinates] = useState(boardValues());

  const iterateOrigin = () => {
    let x = origin[0];
    let y = origin[1];
    if (direction === "vertically") setOrigin([x + 1, y]);
    if (direction === "horizontally") setOrigin([x, y + 1]);
  };

  //hook tracks current value of the word
  useEffect(() => {
    let score = gameState.currentScore;
    let currentLetterMultiplier = 1;
    if (origin) {
      let x = origin[0];
      let y = origin[1];
      iterateOrigin();
      if (boardCoordinates[x][y] === "TLS") currentLetterMultiplier = 3;
      if (boardCoordinates[x][y] === "DLS") currentLetterMultiplier = 2;
      if (boardCoordinates[x][y] === "TWS")
        setWordMultiplier(wordMultiplier * 3);
      if (boardCoordinates[x][y] === "DWS")
        setWordMultiplier(wordMultiplier * 2);

      if (word.length > 0)
        score += word[word.length - 1].points * currentLetterMultiplier;
      setGameState((gameState) => {
        gameState.currentScore = score;
        return { ...gameState };
      });
      const tempC = deepClone(boardCoordinates);
      tempC[x][y] = word[word.length - 1].letter;
      setBoardCoordinates(tempC);
    }
    // eslint-disable-next-line
  }, [word]);

  function assingLettersToPlayer(playerLetters) {
    let playerHand = playerLetters;
    let numberOfLettersToAdd = 7 - playerHand.length;
    let availableLettersreduced = deepClone(availableLetters);
    while (numberOfLettersToAdd > 0) {
      playerHand.push(availableLettersreduced.pop());
      numberOfLettersToAdd--;
      setAvailableLetters(availableLettersreduced);
    }

    if (gameState.isPlayerOneTurn) setPlayerOneLetters(playerHand);
    if (!gameState.isPlayerOneTurn) setPlayerTwoLetters(playerHand);
  }
  //assigning letters to players and removing letters from availableLetters
  useEffect(() => {
    if (gameState.isPlayerOneTurn) {
      setCurrentPlayerInitialLetters(playerOneLetters);
      assingLettersToPlayer(playerOneLetters);
    }
    if (!gameState.isPlayerOneTurn) {
      setCurrentPlayerInitialLetters(playerTwoLetters);
      assingLettersToPlayer(playerTwoLetters);
    }
    // eslint-disable-next-line
  }, [gameState.turn]);

  const handleClick = (e) => {
    var letter;
    if (origin.x !== 0 && direction) {
      if (gameState.isPlayerOneTurn) {
        letter = playerOneLetters.find((ell) => ell.letter === e);
        setPlayerOneLetters(
          playerOneLetters.filter((ell) => {
            if (ell.letter !== e) {
              return true;
            } else {
              e = "";
              return null;
            }
          })
        );
        const newWord = [...word, letter];
        setWord(newWord);
      }
      if (!gameState.isPlayerOneTurn) {
        letter = playerTwoLetters.find((ell) => ell.letter === e);
        setPlayerTwoLetters(
          playerTwoLetters.filter((ell) => {
            if (ell.letter !== e) {
              return true;
            } else {
              e = "";
              return null;
            }
          })
        );
        const newWord = [...word, letter];
        setWord(newWord);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTempCoordinates(deepClone(boardCoordinates));
    if (isPlacedCorrectly) {
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
      setOrigin();
      setDirection();
      setWordMultiplier(1);
      setWord([]);
      setGameState((gameState) => {
        if (!gameState.isPlayerOneTurn)
          gameState.scorePlayerOne += gameState.currentScore * wordMultiplier;
        if (gameState.isPlayerOneTurn)
          gameState.scorePlayerTwo += gameState.currentScore * wordMultiplier;
        gameState.currentScore = 0;
        return gameState;
      }, setIsLoading(false));
    } else alert("Your word is placed incorectly!");
  };

  const handleReset = () => {
    setOrigin();
    setDirection();
    setWordMultiplier(1);
    setWord([]);
    setBoardCoordinates(tempCoordinates);
    assingLettersToPlayer(currentPlayerInitialLetters);
    const toggledCell = document.getElementsByClassName("toggleCell");
    toggledCell.length > 0 && toggledCell[0].classList.remove("toggleCell");
  };

  const handleLettersChange = (e) => {
    gameState.isPlayerOneTurn
      ? setPlayerOneLetters([])
      : setPlayerTwoLetters([]);

    handleSubmit(e);
  };

  if (isLoading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="player-container">
      <Player
        playerOneLetters={playerOneLetters}
        playerTwoLetters={playerTwoLetters}
        isPlayerOneTurn={gameState.isPlayerOneTurn}
        handleClick={handleClick}
        handleSubmit={handleSubmit}
        origin={origin}
        direction={direction}
      />
      {word.length > 0 && (
        <button className="button" onClick={() => handleReset()}>
          Reset
        </button>
      )}
      {word.length === 0 && (
        <button
          className="button"
          onClick={(e) => {
            handleLettersChange(e);
          }}
        >
          {String.fromCharCode(8693)}
        </button>
      )}
    </div>
  );
};

export default Game;
