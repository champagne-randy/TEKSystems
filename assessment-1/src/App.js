import React, { Component } from "react";
import logo from "./logo.svg";
import hotelExterior from "./hotelexterior.jpg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav class="nav" role="navigation">
          <button id="button__back" class="button nav__putton" type="button">
            Back
          </button>
          <h1 class="nav__header">Hotel Details</h1>
          <img class="nav__logo" src={logo} alt="logo" />
        </nav>

        <header className="header" role="banner">
          <hgroup>
            <img
              src={hotelExterior}
              className="header__image"
              alt="hotel exterior"
            />
            <h1>Hilton Chicago</h1>
          </hgroup>
          <address className="header__address">
            720 South Michigan Avenue
            <br />
            Chicago, Illinois, 60605
            <br />
          </address>
          <a className="header__tel" href="tel:1-312-922-4400">
            1-312-922-4400
          </a>
        </header>
      </div>
    );
  }
}

export default App;
