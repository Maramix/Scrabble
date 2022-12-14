import "./App.css";

const Board = ({ boardCoordinates, selectOrigin }) => {
  let boardCells = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
  let cellColor = "";
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      switch (boardCoordinates[i][j]) {
        case "DLS":
          cellColor = "powderblue";
          break;
        case "TLS":
          cellColor = "#be69b1";
          break;
        case "DWS":
          cellColor = "pink";
          break;
        case "TWS":
          cellColor = "tomato";
          break;
        case String.fromCharCode(9734):
          cellColor = "wheat";
          break;
        case "":
          cellColor = "whitesmoke";
          break;
        default:
          cellColor = "#e9e590";
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

  return (
    <div className="board">
      <span>
        {boardCells.map((row, index) => (
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
