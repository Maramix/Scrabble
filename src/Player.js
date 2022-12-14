const Player = ({
  playerOneLetters,
  playerTwoLetters,
  isPlayerOneTurn,
  handleClick,
  handleSubmit,
  origin,
  direction,
}) => {
  let player = "";
  let playerLetters = [];
  if (isPlayerOneTurn) {
    player = "Player One";
    playerLetters = playerOneLetters;
  }
  if (!isPlayerOneTurn) {
    player = "Player Two";
    playerLetters = playerTwoLetters;
  }
  return (
    <div>
      <div className="board-row">
        <h1>{player}</h1>
        <span>
          {playerLetters.map((tile, index) => (
            <button
              onClick={() => handleClick(tile.letter)}
              key={index}
              className="tile"
            >
              {tile.letter} <p>{tile.points}</p>
            </button>
          ))}
        </span>
        {origin[0] && direction && (
          <form onSubmit={(e) => handleSubmit(e)}>
            <button type="submit">Sumbit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Player;
