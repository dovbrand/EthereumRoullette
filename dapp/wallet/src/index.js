import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Wallet from "./Wallet";
import { StoreProvider } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <Wallet />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
