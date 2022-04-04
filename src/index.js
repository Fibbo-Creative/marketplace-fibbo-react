import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ContractProvider from "./context/contracts/ContractProvider";
import contractReducer from "./context/contracts/contractsReducer";
import StateProvider from "./context/StateProvider";
import stateReducer from "./context/stateReducer";

ReactDOM.render(
  <React.StrictMode>
    <ContractProvider reducer={contractReducer}>
      <StateProvider reducer={stateReducer}>
        <App />
      </StateProvider>
    </ContractProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
