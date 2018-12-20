import React, { Component } from "react";
import { findIndex } from "lodash";
import logo from "./logo.svg";
import Room from "./Room";
import rooms from "./room.data";
import "./App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeRooms: new Map()
    };
    this.toggleRoomActivation = this.toggleRoomActivation.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  toggleRoomActivation(e) {
    const { name, checked: isActive } = e.target;
    const index = findIndex(rooms, { name });
    const activeRooms = new Map();
    activeRooms.set(name, isActive);
    rooms.slice(0, index).map(room => activeRooms.set(room.name, true));
    this.setState({
      activeRooms
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("Submitted!");
  };

  render() {
    return (
      <section className="App">
        <header className="App-header" role="banner">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Hilton Assessment 2</h1>
        </header>
        <main className="room-block" role="main">
          <form className="room-block__form" onSubmit={this.handleFormSubmit}>
            <fieldset className="room-block__form__room--container">
              {rooms.map((room, index) => (
                <div key={room.key} className="room-block__form__room--wrapper">
                  <Room
                    name={room.name}
                    label={room.label}
                    isActive={this.state.activeRooms.get(room.name)}
                    isRequired={index === 0}
                    onToggleActivation={this.toggleRoomActivation}
                    availability={room.availability}
                  />
                </div>
              ))}
            </fieldset>
            <button className="room-block__form__submit" type="submit">
              Submit
            </button>
          </form>
        </main>
      </section>
    );
  }
}

export default App;
