import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "normalize.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

declare global {
  interface Window {
    __app_name: string;
  }
}
window.__app_name = "HILTON-ASSESSMENT-2";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
