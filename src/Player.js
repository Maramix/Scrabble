import { useRef } from "react";
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
  const playerLetters = useRef([]);

  if (isPlayerOneTurn) {
    player = "Player One";
    playerLetters.current = playerOneLetters;
  }
  if (!isPlayerOneTurn) {
    player = "Player Two";
    playerLetters.current = playerTwoLetters;
  }

  let letterBeingDragged;
  let indexOfLetterBeingDragged;
  let letterBeingReplaced;
  let indexOfLetterBeingReplaced;

  function dragStart(e) {
    indexOfLetterBeingDragged = parseInt(e.target.id);
    letterBeingDragged = playerLetters.current[indexOfLetterBeingDragged];
  }
  function dragEnd() {}
  function dragOver(e) {
    e.preventDefault();
  }
  function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add("floating");
  }
  function dragLeave(e) {
    e.target.classList.remove("floating");
  }
  function dragDrop(e) {
    indexOfLetterBeingReplaced = parseInt(e.target.id);
    letterBeingReplaced = playerLetters.current[indexOfLetterBeingReplaced];
    let temp = playerLetters.current;
    temp[indexOfLetterBeingDragged] = letterBeingReplaced;
    temp[indexOfLetterBeingReplaced] = letterBeingDragged;
    playerLetters.current = temp;
    e.target.classList.remove("floating");
  }

  return (
    <div>
      <div>
        <h1>{player}</h1>
        <div className="player-cells">
          {playerLetters.current.map((tile, index) => (
            <button
              draggable="true"
              onDragStart={dragStart}
              onDragEnd={dragEnd}
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={dragDrop}
              onClick={() => {
                if (origin) {
                  if (origin[0] < 15 && origin[1] < 15)
                    handleClick(tile.letter);
                  else swal("You are out of the board!");
                }
              }}
              key={index}
              id={index}
              className="player-cell"
            >
              {tile.letter}{" "}
              <p
                id={index}
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
