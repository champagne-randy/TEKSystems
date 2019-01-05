import React, { Component, FormEvent } from "react";
import { findIndex } from "lodash";
import logo from "./logo.svg";
import RoomRequestForm from "./RoomRequestForm";
import { Validate } from "./utils";
import {
  RoomData,
  AppState,
  RoomActivationPayload,
  RequestsUpdatePayload
} from "./interfaces";
import "./App.scss";

class App extends Component {
  readonly state: AppState = { rooms: [] };

  constructor(props: any) {
    super(props);
    this.toggleRoomActivation = this.toggleRoomActivation.bind(this);
    this.updateRoomRequests = this.updateRoomRequests.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  // Note:
  // - this is a stub for backend data fetch
  // - can make Ajax call to a ReST backend here
  // - can alternatively compose this component with Apollo HOC to fetch from GraphQL backend then map props
  // TODO:
  // - make API call a prop function
  // - use async await to demo promise handling
  componentDidMount() {
    const payload = require("./room.data.json");
    this.setState({
      rooms: payload.map((room: RoomData, idx: number) => ({
        ...room,
        requests: {
          adult: {
            value: 1,
            touched: false
          },
          child: {
            value: 0,
            touched: false
          },
          isValid: false
        },
        isActive: idx === 0,
        isRequired: idx === 0
      }))
    });
  }

  toggleRoomActivation = (payload: RoomActivationPayload) => {
    const { name, checked: isActive } = payload.event.target;
    const { rooms } = this.state;
    const index = findIndex(rooms, { name });
    this.setState({
      rooms: rooms.map((room, idx) => ({
        ...room,
        isActive: isActive ? idx <= index : idx < index
      }))
    });
  };

  updateRoomRequests = (payload: RequestsUpdatePayload) => {
    const { name, data } = payload;
    this.setState({
      rooms: this.state.rooms.map(room => ({
        ...room,
        requests:
          room.name === name
            ? {
                ...room.requests,
                ...data,
                isValid: Validate.input.isValidRoomRequest({
                  requests: {
                    ...room.requests,
                    ...data
                  }
                })
              }
            : room.requests
      }))
    });
  };

  handleFormSubmit = ({ event }: { event: FormEvent<HTMLFormElement> }) => {
    event.preventDefault();
    const payload = this.state.rooms
      .filter(room => room.isActive)
      .map(room => ({
        name: room.name,
        requests: {
          adult: room.requests.adult.value,
          child: room.requests.child.value
        }
      }));
    console.log("Submitted payload:");
    console.dir(payload);
    alert(`Submitted!\n\n${JSON.stringify(payload)}`);
  };

  render() {
    // Note:
    // - I chose to only render component if there's room data
    // - This behavior can easily be changed i.e. to render an empy/disabled state
    if (this.state.rooms.length === 0) {
      return null;
    }
    return (
      <section className="App">
        <header className="App-header" role="banner">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Hilton Assessment 2</h1>
        </header>
        <main className="room-request-form__container" role="main">
          <RoomRequestForm
            rooms={this.state.rooms}
            toggleRoomActivation={this.toggleRoomActivation}
            updateRoomRequests={this.updateRoomRequests}
            handleFormSubmit={this.handleFormSubmit}
          />
        </main>
      </section>
    );
  }
}

export default App;
