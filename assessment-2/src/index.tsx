import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import App from "./App";
import { APP_NAME } from "./Constants";
import * as serviceWorker from "./serviceWorker";

declare global {
  interface Window {
    __app_name: string;
  }
}
window.__app_name = APP_NAME;

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
