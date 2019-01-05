import React, { StatelessComponent } from "react";
import logo from "./logo.svg";
import RoomRequestForm from "./RoomRequestForm";
import "./App.scss";

const App: StatelessComponent = () => (
  <section className="App">
    <header className="App-header" role="banner">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Hilton Assessment 2</h1>
    </header>
    <main className="room-request-form__container" role="main">
      <RoomRequestForm />
    </main>
  </section>
);

export default App;
