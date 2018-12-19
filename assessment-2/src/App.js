import React, { Component } from "react";
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
    this.handleToggleRoomActivation = this.handleToggleRoomActivation.bind(
      this
    );
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleToggleRoomActivation(e) {
    const room = e.target.name;
    const isActive = e.target.checked;
    this.setState(prevState => ({
      activeRooms: prevState.activeRooms.set(room, isActive)
    }));
  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("Submitted!");
    // console.dir(this.refs.name.value);
  };

  render() {
    return (
      <section className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Hilton Assessment 2</h1>
        </header>
        <main className="room-block" role="main">
          <form className="room-block__form" onSubmit={this.handleFormSubmit}>
            <fieldset className="room-block__form__room--container">
              {rooms.map(room => (
                <div key={room.key} className="room-block__form__room--wrapper">
                  <Room
                    name={room.name}
                    isActive={this.state.activeRooms.get(room.name)}
                    onToggleActivation={this.handleToggleRoomActivation}
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
