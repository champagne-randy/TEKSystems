import React, { Component } from "react";
import { findIndex } from "lodash";
import logo from "./logo.svg";
import Room from "./Room";
import "./App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = { rooms: [], activeRooms: new Map(), requestedRooms: {} };
    this.toggleRoomActivation = this.toggleRoomActivation.bind(this);
    this.updateRequestedRooms = this.updateRequestedRooms.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    // Note:
    // - this is a stub for backend data fetch
    // - can make Ajax call to a ReST backend here
    // - can alternatively compose this component with Apollo HOC to fetch from GraphQL backend then map props
    const rooms = require("./room.data.json");
    const activeRooms = new Set();
    if (rooms.length > 0) {
      activeRooms.add(rooms[0].name);
    }
    const requestedRooms = {
      ...rooms.reduce(
        (_rooms, room) => ({
          ..._rooms,
          [room.name]: {
            adult: 0,
            child: 0
          }
        }),
        {}
      )
    };
    this.setState({ rooms, activeRooms, requestedRooms });
  }

  toggleRoomActivation = ({ event }) => {
    const { name, checked: isActive } = event.target;
    const { rooms } = this.state;
    const index = findIndex(rooms, { name });
    const activeRooms = new Set();
    if (isActive) {
      activeRooms.add(name);
    }
    rooms.slice(0, index).map(room => activeRooms.add(room.name));
    this.setState({
      activeRooms
    });
  };

  updateRequestedRooms = ({ name, data }) => {
    const { requestedRooms } = this.state;
    this.setState({
      requestedRooms: {
        ...requestedRooms,
        [name]: { ...requestedRooms[name], ...data }
      }
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("Submitted!");
  };

  render() {
    const { rooms, activeRooms, requestedRooms } = this.state;
    // Note:
    // - I chose to only render component if there's room data
    // - This behavior can easily be changed i.e. to render an empy/disabled state
    if (!rooms || !activeRooms) {
      return null;
    }
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
                    isActive={activeRooms.has(room.name)}
                    isRequired={index === 0}
                    onToggleActivation={this.toggleRoomActivation}
                    requestedRooms={requestedRooms[room.name]}
                    updateRequestedRooms={this.updateRequestedRooms}
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
