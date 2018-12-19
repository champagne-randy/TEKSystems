import React from "react";
import PropTypes from "prop-types";
import "./Room.scss";

const Room = ({
  type = "checkbox",
  name,
  isActive = false,
  onToggleActivation
}) => (
  <section className="room">
    <header className="room__title">
      <input
        type={type}
        name={name}
        checked={isActive}
        onChange={onToggleActivation}
      />
      <label>{name}</label>
    </header>
  </section>
);

Room.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onToggleActivation: PropTypes.func.isRequired
};

export default Room;
