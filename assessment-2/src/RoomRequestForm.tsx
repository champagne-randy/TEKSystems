import React, { StatelessComponent } from "react";
import styled from "./styled-components";
import Room from "./Room";
import { RoomRequestFormProps } from "./interfaces";

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

const RoomRequestForm: StatelessComponent<RoomRequestFormProps> = props => {
  const {
    rooms,
    toggleRoomActivation,
    updateRoomRequests,
    handleFormSubmit
  } = props;

  // Note:
  // - I chose to only render component if there's room data
  // - This behavior can easily be changed i.e. to render an empy/disabled state
  if (rooms.length === 0) {
    return null;
  }

  return (
    <Form onSubmit={event => handleFormSubmit({ event })}>
      <Fieldset role="group">
        {rooms.map(room => (
          <Wrapper key={room.key}>
            <Room
              name={room.name}
              label={room.label}
              isActive={room.isActive}
              isRequired={room.isRequired}
              toggleRoomActivation={toggleRoomActivation}
              updateRoomRequests={updateRoomRequests}
              vacancies={room.vacancies}
            />
          </Wrapper>
        ))}
      </Fieldset>
      <button type="submit">Submit</button>
    </Form>
  );
};

export default RoomRequestForm;
