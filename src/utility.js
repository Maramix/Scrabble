export const isOccupied = (boardCoordinates, origin) => {
  let destinationCellValue = boardCoordinates[origin[0]][origin[1]];
  let result = false;
  if (!["", "TLS", "DLS", "TWS", "DWS"].includes(destinationCellValue))
    result = true;
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
