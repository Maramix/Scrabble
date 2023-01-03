const GameBar = ({
  availableLetters,
  gameState,
  origin,
  direction,
  setDirection,
  wordMultiplier,
  word,
}) => {
  if (direction) {
    const toggledButton = document.getElementsByClassName("toggleButton");
    toggledButton.length > 0 &&
      toggledButton[0].classList.remove("toggleButton");
    const activeDirectionButton = document.getElementsByClassName(
      direction.toString()
    );
    activeDirectionButton.length > 0 &&
      activeDirectionButton[0].classList.add("toggleButton");
  }

  return (
    <div className="game-bar-container">
      <h1>Game info:</h1>
      <li>Round: {gameState.round}</li>
      <li>Letters in bag left: {availableLetters.length}</li>
      <li>Player one: {gameState.scorePlayerOne} points</li>
      <li>Player Two: {gameState.scorePlayerTwo} points</li>
      {word.length > 0 && (
        <li>
          Current word: {gameState.currentScore} points x {wordMultiplier}
        </li>
      )}
      <h1>Next action:</h1>
      {!origin && <p>&#171; Click on board to select origin &#187;</p>}
      {origin && word.length === 0 && (
        <div>
          <p>&#171; Select direction &#187;</p>
          <button
            className="button horizontally"
            onClick={() => setDirection("horizontally")}
          >
            {String.fromCharCode(8594)}
          </button>
          <button
            className="button vertically"
            onClick={() => setDirection("vertically")}
          >
            {String.fromCharCode(8595)}
          </button>
        </div>
      )}
    </div>
  );
};

export default GameBar;
