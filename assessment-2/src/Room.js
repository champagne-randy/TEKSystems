import React from "react";
import PropTypes from "prop-types";
import Dropdown from "react-dropdown";
import { range } from "lodash";
import { compose, withProps } from "recompose";
import ShouldShow from "react-should-show";
import { Validate } from "./utils";
import "./Room.scss";
import "react-dropdown/style.css";

// TODO:
// - replace all sections with fieldsets
// - why can I set placeholder dynamically for the dropdowns?
const Room = ({
  type = "checkbox",
  name,
  label,
  isActive = false,
  isRequired = false,
  onToggleActivation,
  options,
  onSelect
}) => (
  <section className="room">
    <header className="room__title">
      <ShouldShow shouldShow={!isRequired}>
        <input
          type={type}
          name={name}
          id={`${name}__activation`}
          checked={isActive || isRequired}
          onChange={onToggleActivation}
        />
      </ShouldShow>
      <label htmlFor={`${name}__activation`}>
        <h2>{label}</h2>
      </label>
    </header>
    <main>
      <section>
        <h3>
          Adults
          <br />
          (18+)
        </h3>
        <Dropdown
          className="room__dropdown"
          options={options.adult}
          onChange={onSelect}
          value={options.adult[0]}
          placeholder="1"
          disabled={!isActive && !isRequired}
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
          onChange={onSelect}
          value={options.child[0]}
          placeholder="1"
          disabled={!isActive && !isRequired}
        />
      </section>
    </main>
  </section>
);

Room.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isRequired: PropTypes.bool,
  onToggleActivation: PropTypes.func.isRequired,
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
