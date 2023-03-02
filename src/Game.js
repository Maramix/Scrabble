// npx json-server --watch src/Data/savedGames.json --port 8000

import { useEffect, useState } from "react";
import Player from "./Player";
import {
  checkForExtraWord,
  boardValues,
  deepClone,
  isOccupied,
  toggleVisibilityByClassName,
  saveGame,
  loadGame,
} from "./utility";
import swal from "sweetalert";

const Game = ({
  language,
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
  setLanguage,
}) => {
  const savedGamesUrl = "http://localhost:8000/savedGames";
  const [isLoading, setIsLoading] = useState(false);
  const [playerOneLetters, setPlayerOneLetters] = useState([]);
  const [playerTwoLetters, setPlayerTwoLetters] = useState([]);
  // eslint-disable-next-line
  const [isPlacedCorrectly, setIsPlacedCorectly] = useState(true);
  const [currentPlayerInitialLetters, setCurrentPlayerInitialLetters] =
    useState([]);
  const [tempCoordinates, setTempCoordinates] = useState(boardValues());
  const [wordsInRound, setWordsInRound] = useState([
    { word: "", points: "", multiplier: "" },
  ]);

  const iterateOrigin = () => {
    let x = origin[0];
    let y = origin[1];
    if (direction === "vertically") setOrigin([x + 1, y]);
    if (direction === "horizontally") setOrigin([x, y + 1]);
  };

  //hook skips occupied cells when iterating origin
  useEffect(() => {
    checkForExtraWord(boardCoordinates, origin, direction);
    if (isOccupied(boardCoordinates, origin)) iterateOrigin();
    // eslint-disable-next-line
  }, [origin]);

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
    else setPlayerTwoLetters(playerHand);
  }
  //assigning letters to players and removing letters from availableLetters
  useEffect(() => {
    if (gameState.isPlayerOneTurn) {
      setCurrentPlayerInitialLetters(playerOneLetters);
      assingLettersToPlayer(playerOneLetters);
    } else {
      setCurrentPlayerInitialLetters(playerTwoLetters);
      assingLettersToPlayer(playerTwoLetters);
    }
    // eslint-disable-next-line
  }, [gameState.turn]);

  const handleClick = (e) => {
    var letter;
    let key;
    if (gameState.isPlayerOneTurn) key = "One";
    else key = "Two";
    if (origin.x !== 0 && direction) {
      letter = eval("player" + key + "Letters").find((ell) => ell.letter === e);
      eval("setPlayer" + key + "Letters")(
        eval("player" + key + "Letters").filter((ell) => {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isOccupied(boardCoordinates, [7, 7]) && word.length > 0)
      swal("First word must go through the center field");
    else {
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
        toggleVisibilityByClassName("handover-container");
        saveGame(
          savedGamesUrl,
          gameState,
          boardCoordinates,
          availableLetters,
          playerOneLetters,
          playerTwoLetters,
          language
        );
        setGameState((gameState) => {
          if (!gameState.isPlayerOneTurn)
            gameState.scorePlayerOne += gameState.currentScore * wordMultiplier;
          if (gameState.isPlayerOneTurn)
            gameState.scorePlayerTwo += gameState.currentScore * wordMultiplier;
          gameState.currentScore = 0;
          return gameState;
        }, setIsLoading(false));
      } else swal("Your word is placed incorectly!");
    }
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
          {"🗘"}
        </button>
      )}
      <button
        className="button"
        onClick={() =>
          loadGame(
            savedGamesUrl,
            setGameState,
            setBoardCoordinates,
            setAvailableLetters,
            setPlayerOneLetters,
            setPlayerTwoLetters,
            setLanguage
          )
        }
      >
        Load last game
      </button>
    </div>
  );
};

export default Game;
