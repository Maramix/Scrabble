const GameBar = ({
  availableLetters,
  gameState,
  origin,
  direction,
  setDirection,
}) => {
  return (
    <div className="game-bar">
      <h1>Game info:</h1>
      <li>Round: {gameState.round}</li>
      <li>Letters in bag left: {availableLetters.length}</li>
      <li>Player one: {gameState.scorePlayerOne} points</li>
      <li>Player Two: {gameState.scorePlayerTwo} points</li>
      <li>Current word: {gameState.currentScore} points</li>
      <h1>Next action:</h1>
      {origin.x === 0 && <p>Click on board to select origin</p>}
      {origin.x !== 0 && (
        <div>
          <p> Select direction</p>
          <button onClick={() => setDirection("horizontally")}>
            {String.fromCharCode(8596)}
          </button>
          <button onClick={() => setDirection("vertically")}>
            {String.fromCharCode(8597)}
          </button>
        </div>
      )}
    </div>
  );
};

export default GameBar;
