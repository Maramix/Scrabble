import swal from "sweetalert";

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
      <div>
        <h1>{player}</h1>
        <div className="player-cells">
          {playerLetters.map((tile, index) => (
            <button
              onClick={() => {
                if (origin) {
                  if (origin[0] < 15 && origin[1] < 15)
                    handleClick(tile.letter);
                  else swal("You are out of the board!");
                }
              }}
              key={index}
              className="player-cell"
            >
              {tile.letter}{" "}
              <p
                style={{
                  fontSize: "0.6vw",
                  position: "relative",
                  top: "2%",
                  left: "25%",
                }}
              >
                {tile.points}
              </p>
            </button>
          ))}
        </div>
        {direction && (
          <form onSubmit={(e) => handleSubmit(e)}>
            <button className="button" type="submit">
              Sumbit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Player;
