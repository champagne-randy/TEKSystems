import React, { Component, Fragment } from "react";
import logo from "./logo.svg";
import hotelExterior from "./hotelexterior.jpg";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <Fragment>
        <header className="header" role="banner">
          <nav className="nav nav--main" role="navigation">
            <hgroup className="nav--main__wrapper">
              <h1 className="nav__header">Hotel Details</h1>
              <a className="nav__logo" href="/">
                <img src={logo} alt="hilton logo" />
              </a>
              <a className="button nav__button" href="/">
                <span className="button__label button__back__label">Back</span>
              </a>
            </hgroup>
          </nav>
          <figure
            className="contact"
            role="img"
            aria-describedby="hilton-chicago__contact"
          >
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
              <a className="tel" href="tel:1-312-922-4400">
                1-312-922-4400
              </a>
            </figcaption>
          </figure>
        </header>
        <main className="menu" role="main">
          <nav className="nav" role="navigation">
            <a className="button" href="/">
              Map
            </a>
            <a className="button" href="/">
              Photo gallery
            </a>
            <a className="button" href="/">
              Amenities
            </a>
            <a className="button" href="/">
              Reviews
            </a>
          </nav>
        </main>
      </Fragment>
    );
  }
}

export default App;
