import React, { Component, Fragment } from "react";
import logo from "./logo.svg";
import hotelExterior from "./hotelexterior.jpg";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <Fragment>
        <header className="header" role="banner">
          <nav className="nav header__nav" role="navigation">
            <h1 className="header__nav__title">Hotel Details</h1>
            <a className="header__nav__logo" href="/">
              <img src={logo} alt="hilton logo" />
            </a>
            <a className="button header__nav__button" href="/">
              <span className="button__label button__back__label">Back</span>
            </a>
          </nav>
        </header>
        <main className="contact__container" role="main">
          <figure
            className="contact"
            role="img"
            aria-describedby="contact__details"
          >
            <picture className="contact__image">
              <img src={hotelExterior} alt="hilton chicago hotel exterior" />
            </picture>
            <figcaption id="contact__details" className="contact__details">
              <h1>Hilton Chicago</h1>
              <address className="contact__address">
                720 South Michigan Avenue
                <br />
                Chicago, Illinois, 60605
                <br />
              </address>
              <a className="contact__tel" href="tel:1-312-922-4400">
                1-312-922-4400
              </a>
            </figcaption>
          </figure>
        </main>
        <section className="menu">
          <nav className="menu__nav" role="navigation">
            <a className="button menu__nav__button" href="/">
              <span className="button__label button__menu__label">Map</span>
            </a>
            <a className="button menu__nav__button" href="/">
              <span className="button__label button__menu__label">
                Photo gallery
              </span>
            </a>
            <a className="button menu__nav__button" href="/">
              <span className="button__label button__menu__label">
                Amenities
              </span>
            </a>
            <a className="button menu__nav__button" href="/">
              <span className="button__label button__menu__label">Reviews</span>
            </a>
          </nav>
        </section>
        <footer className="footer">
          <span>&copy; 2018 Hilton</span>
        </footer>
      </Fragment>
    );
  }
}

export default App;
