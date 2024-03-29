import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import StateProvider from "./context/StateProvider";
import stateReducer from "./context/stateReducer";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider reducer={stateReducer}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
