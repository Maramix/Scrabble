import { useEffect, useState } from "react";
import Player from "./Player";

const Game = ({
  boardCoordinates,
  setBoardCoordinates,
  availableLetters,
  setAvailableLetters,
  gameState,
  setGameState,
  origin,
  selectOrigin,
  direction,
  setDirection,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [playerOneLetters, setPlayerOneLetters] = useState([]);
  const [playerTwoLetters, setPlayerTwoLetters] = useState([]);
  const [word, setWord] = useState([]);
  const [currentWordMultiplier, setCurrentWordMultiplier] = useState(1);

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

    if (origin.x !== 0 && direction) {
      if (gameState.isPlayerOneTurn) {
        var letter = playerOneLetters.find((ell) => ell.letter === e);
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
        console.log(word);
      }
      if (!gameState.isPlayerOneTurn) {
        var letter = playerTwoLetters.find((ell) => ell.letter === e);
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
        console.log(word);
      }
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
    selectOrigin(null, null);
    setDirection();
    setCurrentWordMultiplier(1);
    setWord([]);
    setGameState((gameState) => {
      if (!gameState.isPlayerOneTurn)
        gameState.scorePlayerOne +=
          gameState.currentScore * currentWordMultiplier;
      if (gameState.isPlayerOneTurn)
        gameState.scorePlayerTwo +=
          gameState.currentScore * currentWordMultiplier;
      gameState.currentScore = 0;
      return gameState;
    });
  };

  //hook tracks current value of the word
  useEffect(() => {
    let score = gameState.currentScore;
    let currentLetterMultiplier = 1;
    let tempBoard = [...boardCoordinates];

    if (origin[0]) {
      if (boardCoordinates[origin[0]][origin[1]] === "TLS")
        currentLetterMultiplier = 3;
      if (boardCoordinates[origin[0]][origin[1]] === "DLS")
        currentLetterMultiplier = 2;
      if (boardCoordinates[origin[0]][origin[1]] === "TWS")
        setCurrentWordMultiplier(currentWordMultiplier * 3);
      if (boardCoordinates[origin[0]][origin[1]] === "DWS")
        setCurrentWordMultiplier(currentWordMultiplier * 2);
      if (direction === "vertically") selectOrigin(origin[0] + 1, origin[1]);
      if (direction === "horizontally") selectOrigin(origin[0], origin[1] + 1);
      console.log(
        boardCoordinates[origin[0]][origin[1]],
        currentWordMultiplier
      );
      if (word.length > 0)
        score += word[word.length - 1].points * currentLetterMultiplier;
      setGameState((gameState) => {
        gameState.currentScore = score;
        return { ...gameState };
      });

      tempBoard[origin[0]][origin[1]] = word[word.length - 1].letter;
      setBoardCoordinates(tempBoard);
    }
    console.log(word[word.length - 1]);
    // eslint-disable-next-line
  }, [word]);

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
    </div>
  );
};

export default Game;
