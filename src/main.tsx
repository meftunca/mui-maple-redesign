import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

console.log(`process.env`, import.meta.env);

// ReactDOM.render(
//   <React.StrictMode>
//     <h1>Hello WOlrd</h1>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
if (import.meta.env.DEV === false) {
  let container = document.getElementById("root");

  if (container === null) container = document.body;

  const root = ReactDOM.createRoot(container);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}
