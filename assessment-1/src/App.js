import React, { Component, Fragment } from "react";
import logo from "./logo.svg";
import hotelExterior from "./hotelexterior.jpg";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <Fragment>
        <header className="header" role="banner">
          <nav className="nav" role="navigation">
            <h1 className="nav__header">Hotel Details</h1>
            <img className="nav__logo" src={logo} alt="hilto logo" />
            <button
              id="button__back"
              className="button nav__putton"
              type="button"
            >
              Back
            </button>
          </nav>
          <figure role="img" aria-describedby="hilton-chicago__contact">
            <img
              src={hotelExterior}
              className="header__image"
              alt="hilto chicago hotel exterior"
            />
            <figcaption id="hilton-chicago__contact">
              <h1>Hilton Chicago</h1>
              <address className="header__address">
                720 South Michigan Avenue
                <br />
                Chicago, Illinois, 60605
                <br />
              </address>
              <a className="header__tel" href="tel:1-312-922-4400">
                1-312-922-4400
              </a>
            </figcaption>
          </figure>
        </header>
        <main className="menu" role="main">
          <nav className="nav" role="navigation">
            <a href="/">Map</a>
            <a href="/">Photo gallery</a>
            <a href="/">Amenities</a>
            <a href="/">Reviews</a>
          </nav>
        </main>
      </Fragment>
    );
  }
}

export default App;
