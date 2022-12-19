const GameBar = ({
  availableLetters,
  gameState,
  origin,
  direction,
  setDirection,
  wordMultiplier,
}) => {
  return (
    <div className="game-bar">
      <h1>Game info:</h1>
      <li>Round: {gameState.round}</li>
      <li>Letters in bag left: {availableLetters.length}</li>
      <li>Player one: {gameState.scorePlayerOne} points</li>
      <li>Player Two: {gameState.scorePlayerTwo} points</li>
      {direction && (
        <li>
          Current word: {gameState.currentScore} points x {wordMultiplier}
        </li>
      )}
      <h1>Next action:</h1>
      {!origin && <p>&#171; Click on board to select origin &#187;</p>}
      {origin && (
        <div>
          <p>&#171; Select direction &#187;</p>
          <button onClick={() => setDirection("horizontally")}>
            {String.fromCharCode(8594)}
          </button>
          <button onClick={() => setDirection("vertically")}>
            {String.fromCharCode(8595)}
          </button>
        </div>
      )}
    </div>
  );
};

export default GameBar;
