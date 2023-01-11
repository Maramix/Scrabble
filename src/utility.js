export const isOccupied = (boardCoordinates, origin) => {
  let result = false;
  if (origin && origin[0] < 15 && origin[1] < 15) {
    let destinationCellValue = boardCoordinates[origin[0]][origin[1]];
    if (
      !["", String.fromCharCode(9734), "TLS", "DLS", "TWS", "DWS"].includes(
        destinationCellValue
      )
    )
      result = true;
  }
  return result;
};

export const boardValues = () => {
  const values = [
    ["TWS", "", "", "DLS", "", "", "", "TWS", "", "", "", "DLS", "", "", "TWS"],
    ["", "DWS", "", "", "", "TLS", "", "", "", "TLS", "", "", "", "DWS", ""],
    ["", "", "DWS", "", "", "", "DLS", "", "DLS", "", "", "", "DWS", "", ""],
    ["DLS", "", "", "DWS", "", "", "", "DLS", "", "", "", "DWS", "", "", "DLS"],
    ["", "", "", "", "DWS", "", "", "", "", "", "DWS", "", "", "", ""],
    ["", "TLS", "", "", "", "TLS", "", "", "", "TLS", "", "", "", "TLS", ""],
    ["", "", "DLS", "", "", "", "DLS", "", "DLS", "", "", "", "DLS", "", ""],
    [
      "TWS",
      "",
      "",
      "DLS",
      "",
      "",
      "",
      String.fromCharCode(9734),
      "",
      "",
      "",
      "DLS",
      "",
      "",
      "TWS",
    ],
    ["", "", "DLS", "", "", "", "DLS", "", "DLS", "", "", "", "DLS", "", ""],
    ["", "TLS", "", "", "", "TLS", "", "", "", "TLS", "", "", "", "TLS", ""],
    ["", "", "", "", "DWS", "", "", "", "", "", "DWS", "", "", "", ""],
    ["DLS", "", "", "DWS", "", "", "", "DLS", "", "", "", "DWS", "", "", "DLS"],
    ["", "", "DWS", "", "", "", "DLS", "", "DLS", "", "", "", "DWS", "", ""],
    ["", "DWS", "", "", "", "TLS", "", "", "", "TLS", "", "", "", "DWS", ""],
    ["TWS", "", "", "DLS", "", "", "", "TWS", "", "", "", "DLS", "", "", "TWS"],
  ];
  return values;
};

export const deepClone = (value) => {
  const clone = JSON.parse(JSON.stringify(value));
  return clone;
};

export const checkForExtraWord = (boardCoordinates, origin, direction) => {
  if (origin) {
    var x = origin[0];
    var y = origin[1];
    let word = [boardCoordinates[x][y]];
    console.log(origin, boardCoordinates[x][y]);
    switch (direction) {
      case "horizontally":
        while (isOccupied(boardCoordinates, [x + 1, y])) {
          word.push(boardCoordinates[x][y]);
          console.log(word, x, boardCoordinates[x][y]);
          x++;
        }
        // while (isOccupied(boardCoordinates, [x, y])){
        //   word.unshift(boardCoordinates[x][y]);
        // console.log(word, x, isOccupied(boardCoordinates, [x, y]));
        // x--;}
        break;
      default:
        console.log("no letter added");
    }
  }
};

export const toggleVisibilityByClassName = (className) => {
  const elements = document.getElementsByClassName(className);
  elements[0].classList.toggle("visible");
};

export const saveGame = (
  savedGamesUrl,
  gameState,
  boardCoordinates,
  availableLetters,
  language
) => {
  const gameSave = {
    gameState,
    boardCoordinates,
    availableLetters,
    language,
  };
  fetch(savedGamesUrl + "/1", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gameSave),
  }).then(() => console.log("game saved"));
};

export const loadGame = () => {};
