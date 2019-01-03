import React from "react";
import PropTypes from "prop-types";
import { compose, withProps } from "recompose";
import Room from "./Room";
import "./RoomRequestForm.scss";

// TODO:
// - show message if user clicks on submit & form is invalid
//  + should I use popper to create a tooltip for this?
// - impl styling logic to show message when an input is invalid
const RoomRequestForm = ({
  rooms,
  activeRooms,
  requestedRooms,
  toggleRoomActivation,
  updateRoomRequests,
  isFormValid,
  handleFormSubmit
}) => (
  <form className="room-request-form" onSubmit={handleFormSubmit}>
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
            availability={room.availability}
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

RoomRequestForm.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      availability: PropTypes.shape({
        adult: PropTypes.number.isRequired,
        child: PropTypes.number.isRequired
      }).isRequired,
      requests: PropTypes.shape({
        adult: PropTypes.shape({
          value: PropTypes.number.isRequired,
          touched: PropTypes.bool.isRequired
        }).isRequired,
        child: PropTypes.shape({
          value: PropTypes.number.isRequired,
          touched: PropTypes.bool.isRequired
        }).isRequired,
        isValid: PropTypes.bool.isRequired
      }).isRequired,
      isActive: PropTypes.bool.isRequired,
      isRequired: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired,
  toggleRoomActivation: PropTypes.func.isRequired,
  updateRoomRequests: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  isFormValid: PropTypes.bool.isRequired
};

export default compose(
  withProps(({ rooms }) => ({
    isFormValid: rooms
      .filter(room => room.isActive)
      .reduce((isValid, room) => isValid && room.requests.isValid, true)
  }))
)(RoomRequestForm);
