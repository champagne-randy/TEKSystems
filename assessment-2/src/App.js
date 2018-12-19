import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <section className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Hilton Assessment 2</h1>
        </header>
      </section>
    );
  }
}

export default App;
