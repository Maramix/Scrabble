import { useState } from "react";
import "./App.css";

const Board = ({ selectOrigin }) => {
  const boardCoordinates = [
    ["TWS", "", "", "DLS", "", "", "", "TWS", "", "", "", "DLS", "", "", "TWS"],
    ["", "DWS", "", "", "", "TLS", "", "", "", "TLS", "", "", "", "DWS", ""],
    ["", "", "DWS", "", "", "", "DLS", "", "DLS", "", "", "", "DWS", "", ""],
    ["DLS", "", "", "DWS", "", "", "", "DLS", "", "", "", "DWS", "", "", "DLS"],
    ["", "", "", "", "DWS", "", "", "", "", "", "DWS", "", "", "", ""],
    ["", "TLS", "", "", "", "TLS", "", "", "", "TLS", "", "", "", "TLS", ""],
    ["", "", "DLS", "", "", "", "DLS", "", "DLS", "", "", "", "DLS", "", ""],
    ["TWS", "", "", "DLS", "", "", "", "O", "", "", "", "DLS", "", "", "TWS"],
    ["", "", "DLS", "", "", "", "DLS", "", "DLS", "", "", "", "DLS", "", ""],
    ["", "TLS", "", "", "", "TLS", "", "", "", "TLS", "", "", "", "TLS", ""],
    ["", "", "", "", "DWS", "", "", "", "", "", "DWS", "", "", "", ""],
    ["DLS", "", "", "DWS", "", "", "", "DLS", "", "", "", "DWS", "", "", "DLS"],
    ["", "", "DWS", "", "", "", "DLS", "", "DLS", "", "", "", "DWS", "", ""],
    ["", "DWS", "", "", "", "TLS", "", "", "", "TLS", "", "", "", "DWS", ""],
    ["TWS", "", "", "DLS", "", "", "", "TWS", "", "", "", "DLS", "", "", "TWS"],
  ];

  let boardCells = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
  let cellColor = "";
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      switch (boardCoordinates[i][j]) {
        case "DLS":
          cellColor = "powderblue";
          break;
        case "TLS":
          cellColor = "mediumvioletred";
          break;
        case "DWS":
          cellColor = "pink";
          break;
        case "TWS":
          cellColor = "tomato";
          break;
        case "O":
          cellColor = "wheat";
          break;
        default:
          cellColor = "whitesmoke";
          break;
      }
      boardCells[i].push({
        value: boardCoordinates[i][j],
        x: i + 1,
        y: j + 1,
        color: cellColor,
        letter: "",
      });
    }
  }

  // function sets new value for the cell on the board
  const [boardCellsState, setBoardCellsState] = useState(boardCells);
  function setCellValue(x, y, newValue) {
    console.log(boardCellsState[x][y], newValue);
  }

  return (
    <div>
      <span className="board-row">
        {boardCellsState.map((row, index) => (
          <div key={index}>
            {row.map((cell, index2) => (
              <button
                onClick={() => selectOrigin(cell.x, cell.y)}
                key={index2}
                style={{ backgroundColor: cell.color }}
                className="cell"
              >
                {cell.value}
              </button>
            ))}
            {index % 15 === 0 && <br />}
          </div>
        ))}
      </span>
    </div>
  );
};

export default Board;
