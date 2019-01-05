import React, { StatelessComponent } from "react";
import Room from "./Room";
import { RoomRequestFormProps } from "./interfaces";
import { Validate } from "./utils";
import "./RoomRequestForm.scss";

// TODO:
// - show message if user clicks on submit & form is invalid
//  + should I use popper to create a tooltip for this?
const RoomRequestForm: StatelessComponent<RoomRequestFormProps> = props => {
  const {
    rooms,
    toggleRoomActivation,
    updateRoomRequests,
    handleFormSubmit
  } = props;

  const isFormValid = Validate.isRoomReqFormValid({ rooms });

  return (
    <form
      className="room-request-form"
      onSubmit={event => handleFormSubmit({ event })}
    >
      <div className="room-request-form__room__container" role="group">
        {rooms.map(room => (
          <div key={room.key} className="room-request-form__room__wrapper">
            <Room
              name={room.name}
              label={room.label}
              isActive={room.isActive}
              isRequired={room.isRequired}
              requests={room.requests}
              toggleRoomActivation={toggleRoomActivation}
              updateRoomRequests={updateRoomRequests}
              vacancies={room.vacancies}
            />
          </div>
        ))}
      </div>
      <button
        className="room-request-form__submit"
        type="submit"
        disabled={!isFormValid}
      >
        Submit
      </button>
    </form>
  );
};

export default RoomRequestForm;
