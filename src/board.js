import "./App.css";
import { isOccupied } from "./utility";

const Board = ({ boardCoordinates, setOrigin, origin, word }) => {
  let boardCells = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
  let cellColor = "";
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      switch (boardCoordinates[i][j]) {
        case "DLS":
          cellColor = "powderblue";
          break;
        case "TLS":
          cellColor = "#A274D3";
          break;
        case "DWS":
          cellColor = "pink";
          break;
        case "TWS":
          cellColor = "#FF5100";
          break;
        case String.fromCharCode(9734):
          cellColor = "#FFE800";
          break;
        case "":
          cellColor = "whitesmoke";
          break;
        default:
          cellColor = "#FFE800";
          break;
      }
      boardCells[i].push({
        value: boardCoordinates[i][j],
        x: i,
        y: j,
        color: cellColor,
        letter: "",
      });
    }
  }

  if (origin) {
    const toggledCell = document.getElementsByClassName("toggleCell");
    toggledCell.length > 0 && toggledCell[0].classList.remove("toggleCell");
    const cellToToggle = document.getElementById(
      origin[0].toString() + "." + origin[1].toString()
    );
    cellToToggle && cellToToggle.classList.add("toggleCell");
  }

  return (
    <div className="board-container">
      {boardCells.map((row, index) => (
        <div className="board-row" key={index}>
          {row.map((cell, index2) => (
            <button
              className="board-cell"
              onClick={() => {
                if (
                  word.length === 0 &&
                  !isOccupied(boardCoordinates, [index, index2])
                ) {
                  setOrigin([cell.x, cell.y]);
                }
              }}
              key={index2}
              style={{ backgroundColor: cell.color }}
              id={index.toString() + "." + index2.toString()}
            >
              {cell.value}
            </button>
          ))}
          {index % 15 === 0 && <br />}
        </div>
      ))}
    </div>
  );
};

export default Board;
