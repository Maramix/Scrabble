import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <link
      href="http://fonts.googleapis.com/css?family=Autour+One&subset=latin,latin-ext"
      rel="stylesheet"
      type="text/css"
    />

    <App className="main" />
  </React.StrictMode>
);
