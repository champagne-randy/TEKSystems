import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav class="nav">
          <button id="button__back" class="button nav__putton" type="button">
            Back
          </button>
          <h1 class="nav__header">Hotel Details</h1>
          <img class="nav__logo" src={logo} alt="logo" />
        </nav>
      </div>
    );
  }
}

export default App;
