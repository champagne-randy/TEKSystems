import React from "react";
import PropTypes from "prop-types";
import Dropdown from "react-dropdown";
import { range } from "lodash";
import { compose, withProps } from "recompose";
import ShouldShow from "react-should-show";
import classNames from "classnames";
import { Validate } from "./utils";
import "react-dropdown/style.css";
import "./Room.scss";

// TODO:
// - replace all sections with fieldsets
// - should isActive automagically be true if isRequired?
const Room = ({
  name,
  label,
  isActive = false,
  isRequired = false,
  onToggleActivation,
  requestedRooms,
  updateRequestedRooms,
  options
}) => (
  <section
    className={classNames("room", {
      room__disabled: !isActive
    })}
    data-testid="room"
  >
    <header className="room__header">
      <ShouldShow shouldShow={!isRequired}>
        <input
          type="checkbox"
          name={name}
          id={`${name}__activation`}
          checked={isActive || isRequired}
          onChange={event => onToggleActivation({ event })}
          data-testid="room__header__checkbox"
        />
      </ShouldShow>
      <label htmlFor={`${name}__activation`}>
        <h2>{label}</h2>
      </label>
    </header>
    <main
      className={classNames("room__requests", {
        room__requests__active: isActive || isRequired
      })}
      data-testid="room__requests"
    >
      <section>
        <h3>
          Adults
          <br />
          (18+)
        </h3>
        <Dropdown
          className="room__requests__dropdown"
          options={options.adult}
          onChange={event =>
            updateRequestedRooms({ name, data: { adult: event.value } })
          }
          value={{ label: requestedRooms.adult, value: requestedRooms.adult }}
          disabled={!isActive && !isRequired}
          data-testid="room__requests_dropdown--adult"
        />
      </section>
      <section>
        <h3>
          Children
          <br />
          (0 - 17)
        </h3>
        <Dropdown
          className="room__dropdown"
          options={options.child}
          onChange={event =>
            updateRequestedRooms({ name, data: { child: event.value } })
          }
          value={{ label: requestedRooms.child, value: requestedRooms.child }}
          disabled={!isActive && !isRequired}
          data-testid="room__requests_dropdown--child"
        />
      </section>
    </main>
  </section>
);

Room.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isRequired: PropTypes.bool,
  onToggleActivation: PropTypes.func.isRequired,
  requestedRooms: PropTypes.shape({
    adult: PropTypes.number.isRequired,
    child: PropTypes.number.isRequired
  }).isRequired,
  updateRequestedRooms: PropTypes.func.isRequired,
  availability: PropTypes.shape({
    adult: Validate.prop.greaterThanZero,
    child: Validate.prop.greaterThanZero
  }).isRequired,
  options: PropTypes.shape({
    adult: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    child: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  }).isRequired
};

export default compose(
  withProps(({ availability }) => ({
    options: {
      adult: range(1, availability.adult + 1),
      child: range(1, availability.child + 1)
    }
  }))
)(Room);
