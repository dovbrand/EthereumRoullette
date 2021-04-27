import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
      <App  BETS={window.BETS_ARRAY}/>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
