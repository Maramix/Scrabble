import { useEffect, useState } from "react";
import Player from "./Player";
import { boardValues, isOccupied } from "./utility";

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
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [playerOneLetters, setPlayerOneLetters] = useState([]);
  const [playerTwoLetters, setPlayerTwoLetters] = useState([]);
  const [word, setWord] = useState([]);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [currentPlayerInitialLetters, setCurrentPlayerInitialLetters] =
    useState([]);
  const [tempCoordinates, setTempCoordinates] = useState(boardValues());
  console.log(tempCoordinates);

  //hook tracks current value of the word
  useEffect(() => {
    let score = gameState.currentScore;
    let currentLetterMultiplier = 1;
    let tempBoard = [...boardCoordinates];
    if (origin) {
      let x = origin[0];
      let y = origin[1];

      if (boardCoordinates[x][y] === "TLS") currentLetterMultiplier = 3;
      if (boardCoordinates[x][y] === "DLS") currentLetterMultiplier = 2;
      if (boardCoordinates[x][y] === "TWS")
        setWordMultiplier(wordMultiplier * 3);
      if (boardCoordinates[x][y] === "DWS")
        setWordMultiplier(wordMultiplier * 2);
      if (direction === "vertically") setOrigin([x + 1, y]);
      if (direction === "horizontally") setOrigin([x, y + 1]);
      if (word.length > 0)
        score += word[word.length - 1].points * currentLetterMultiplier;
      setGameState((gameState) => {
        gameState.currentScore = score;
        return { ...gameState };
      });

      tempBoard[x][y] = word[word.length - 1].letter;
      setBoardCoordinates(tempBoard);
    }
    // eslint-disable-next-line
  }, [word]);

  useEffect(() => {
    if (gameState.isPlayerOneTurn)
      setCurrentPlayerInitialLetters(playerOneLetters);
    if (!gameState.isPlayerOneTurn)
      setCurrentPlayerInitialLetters(playerTwoLetters);
  }, [gameState.turn]);

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
    let tempWord = [...word];
    var letter;
    if (isOccupied(boardCoordinates, origin)) setIsIntersecting(true);
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
        tempWord.push(letter);
        setWord(tempWord);
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
        tempWord.push(letter);
        setWord(tempWord);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempC = [...boardCoordinates];
    setTempCoordinates(tempC);
    if (isIntersecting) {
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
      setIsIntersecting(false);
      setGameState((gameState) => {
        if (!gameState.isPlayerOneTurn)
          gameState.scorePlayerOne += gameState.currentScore * wordMultiplier;
        if (gameState.isPlayerOneTurn)
          gameState.scorePlayerTwo += gameState.currentScore * wordMultiplier;
        gameState.currentScore = 0;
        return gameState;
      });
    } else alert("Your word is placed incorectly!");
  };

  const handleReset = () => {
    setOrigin();
    setDirection();
    setWordMultiplier(1);
    setWord([]);
    setIsIntersecting(false);
    setBoardCoordinates(tempCoordinates);
    assingLettersToPlayer(currentPlayerInitialLetters);
  };

  if (isLoading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="player">
      <Player
        playerOneLetters={playerOneLetters}
        playerTwoLetters={playerTwoLetters}
        isPlayerOneTurn={gameState.isPlayerOneTurn}
        handleClick={handleClick}
        handleSubmit={handleSubmit}
        origin={origin}
        direction={direction}
      />
      <button onClick={() => handleReset()}>Reset</button>
    </div>
  );
};

export default Game;
