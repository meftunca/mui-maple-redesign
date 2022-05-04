import React from "react";
import ReactDOM from "react-dom";
import Router from "./Router";

let container = document.getElementById("root");

if (container === null) container = document.body;

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
