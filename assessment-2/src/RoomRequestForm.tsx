import React, { PureComponent, FormEvent } from "react";
import { find, get, findIndex } from "lodash";
import styled from "./styled-components";
import Room from "./Room";
import {
  RoomRequestFormState,
  RoomData,
  RoomActivationHandler,
  RequestsUpdateHandler,
  RoomRequestsSubmissionPayload
} from "./types";
import LocalStorage from "./LocalStorage";

const Form = styled("form")`
  width: 100%;
  border: none;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
`;

const Fieldset = styled("div")`
  width: 100%;
  border: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Wrapper = styled("div")`
  display: inline-block;
  width: 24%;
  margin: 0;
  margin-right: 10px;
  margin-bottom: 20px;
  padding: 0;
  &:last-child {
    margin-right: 0;
    align-self: auto;
  }
`;

class RoomRequestForm extends PureComponent {
  // TODO:
  // - use apollo cache instead of React state?
  readonly state: RoomRequestFormState;

  constructor(props: any) {
    super(props);

    const stateFromStorage =
      LocalStorage.isAvailable &&
      JSON.parse(LocalStorage.get("RoomRequestFormState") || "[]");

    this.state = {
      rooms: (stateFromStorage && get(stateFromStorage, "rooms")) || []
    };
    this.toggleRoomActivation = this.toggleRoomActivation.bind(this);
    this.updateRoomRequests = this.updateRoomRequests.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const payload = require("./room.data.json");
    this.setState({
      rooms: payload.map((room: RoomData, idx: number) => ({
        ...room,
        requests: {
          adult: 1,
          child: 0
        },
        isActive: idx === 0,
        isRequired: idx === 0,
        ...find(this.state.rooms, { name: room.name })
      }))
    });
  }

  toggleRoomActivation: RoomActivationHandler = payload => {
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

  updateRoomRequests: RequestsUpdateHandler = payload => {
    const { name, data } = payload;
    this.setState({
      rooms: this.state.rooms.map(room => ({
        ...room,
        requests:
          room.name === name
            ? {
                ...room.requests,
                ...data
              }
            : room.requests
      }))
    });
  };

  handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    LocalStorage.isAvailable &&
      LocalStorage.set("RoomRequestFormState", JSON.stringify(this.state));

    const roomRequests: RoomRequestsSubmissionPayload[] = this.state.rooms
      .filter(room => room.isActive)
      .map(room => ({
        name: room.name,
        requests: room.requests
      }));

    console.log("RoomRequestForm submitted:");
    console.dir(roomRequests);
    alert(
      `RoomRequestForm submitted:\n${JSON.stringify(roomRequests, null, 4)}`
    );
  };

  render() {
    // Note:
    // - I chose to only render component if there's room data
    // - This behavior can easily be changed i.e. to render an empy/disabled state
    if (this.state.rooms.length === 0) {
      return null;
    }

    return (
      <Form onSubmit={this.handleFormSubmit}>
        <Fieldset role="group">
          {this.state.rooms.map(room => (
            <Wrapper key={room.key}>
              <Room
                name={room.name}
                label={room.label}
                isActive={room.isActive}
                isRequired={room.isRequired}
                toggleRoomActivation={this.toggleRoomActivation}
                updateRoomRequests={this.updateRoomRequests}
                vacancies={room.vacancies}
                requests={room.requests}
              />
            </Wrapper>
          ))}
        </Fieldset>
        <button type="submit">Submit</button>
      </Form>
    );
  }
}

export default RoomRequestForm;
