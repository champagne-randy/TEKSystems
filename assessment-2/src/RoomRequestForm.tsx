import React, { PureComponent, FormEvent } from "react";
import { find, get, findIndex } from "lodash";
import cuid from "cuid";
import styled from "./styled-components";
import axios, { AxiosResponse } from "axios";
import { BACKEND_BASE_URL } from "./Constants";
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

  async componentDidMount() {
    const CancelToken = axios.CancelToken;
    const source = CancelToken && CancelToken.source();

    const resp: any = await axios
      .get(`${new URL("/rooms", BACKEND_BASE_URL)}`, {
        cancelToken: source && source.token
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log("Request has been cancelled");
        } else {
          console.error(error);
        }
      });

    this.setState((prevState: RoomRequestFormState) => ({
      rooms: resp.data.map((room: RoomData, idx: number) => ({
        ...room,
        requests: {
          adult: 1,
          child: 0
        },
        isActive: idx === 0,
        isRequired: idx === 0,
        ...find(prevState.rooms, { name: room.name })
      }))
    }));
  }

  toggleRoomActivation: RoomActivationHandler = event => {
    const { name, checked: isActive } = event.target;
    const { rooms } = this.state;
    const index = findIndex(rooms, { name });
    this.setState((prevState: RoomRequestFormState) => ({
      rooms: prevState.rooms.map((room, idx) => ({
        ...room,
        isActive: isActive ? idx <= index : idx < index
      }))
    }));
  };

  updateRoomRequests: RequestsUpdateHandler = event => {
    event.persist();
    const [name, requestField] = event.target.name.split("--");
    this.setState((prevState: RoomRequestFormState) => ({
      rooms: prevState.rooms.map(room => ({
        ...room,
        requests:
          room.name === name
            ? {
                ...room.requests,
                [requestField]: +event.target.value
              }
            : room.requests
      }))
    }));
  };

  handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    LocalStorage.isAvailable &&
      LocalStorage.set("RoomRequestFormState", JSON.stringify(this.state));

    // Manually generated ids are a hack to get json-server to accept payload
    // - see: https://github.com/typicode/json-server/issues/798
    const payload: RoomRequestsSubmissionPayload = {
      id: cuid(),
      rooms: this.state.rooms
        .filter(room => room.isActive)
        .map(room => ({
          id: cuid(),
          name: room.name,
          requests: room.requests
        }))
    };

    const CancelToken = axios.CancelToken;
    const source = CancelToken && CancelToken.source();
    await axios
      .post(`${new URL("/requests", BACKEND_BASE_URL)}`, payload, {
        cancelToken: source && source.token
      })
      .then(resp => {
        // if (axios.isCancel(resp)) {
        //   console.log("Request has been cancelled");
        // } else {
        console.log("RoomRequestForm submitted:");
        console.dir(resp);
        alert(`RoomRequestForm submitted:\n${JSON.stringify(resp, null, 4)}`);
        // }
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log("Request has been cancelled");
        } else {
          console.error(error);
        }
      });
  };

  render() {
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
