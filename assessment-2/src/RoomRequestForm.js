import React from "react";
import PropTypes from "prop-types";
import Room from "./Room";
import { Validate } from "./utils";
import "./RoomRequestForm.scss";

const RoomRequestForm = ({
  rooms,
  activeRooms,
  requestedRooms,
  toggleRoomActivation,
  updateRequestedRooms,
  handleFormSubmit
}) => (
  <form className="room-request-form" onSubmit={handleFormSubmit}>
    <div className="room-request-form__room__container" role="group">
      {rooms.map((room, index) => (
        <div key={room.key} className="room-request-form__room__wrapper">
          <Room
            name={room.name}
            label={room.label}
            isActive={activeRooms.has(room.name)}
            isRequired={index === 0}
            onToggleActivation={toggleRoomActivation}
            requestedRooms={requestedRooms[room.name]}
            updateRequestedRooms={updateRequestedRooms}
            availability={room.availability}
          />
        </div>
      ))}
    </div>
    <button className="room-request-form__submit" type="submit">
      Submit
    </button>
  </form>
);

RoomRequestForm.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      availability: PropTypes.shape({
        adult: PropTypes.number.isRequired,
        child: PropTypes.number.isRequired
      }).isRequired
    }).isRequired
  ).isRequired,
  activeRooms: Validate.prop.instanceOfSet,
  // TODO:
  // - make custom validator with dynamic keys
  // - https://stackoverflow.com/a/34365401
  requestedRooms: PropTypes.object.isRequired,
  toggleRoomActivation: PropTypes.func.isRequired,
  updateRequestedRooms: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired
};

export default RoomRequestForm;
