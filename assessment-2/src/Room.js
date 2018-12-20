import React from "react";
import PropTypes from "prop-types";
import Dropdown from "react-dropdown";
import { range } from "lodash";
import { compose, withProps } from "recompose";
import { Validate } from "./utils";
import "./Room.scss";
import "react-dropdown/style.css";

const Room = ({
  type = "checkbox",
  name,
  isActive = false,
  onToggleActivation,
  options,
  onSelect
}) => (
  <section className="room">
    <header className="room__title">
      <input
        type={type}
        name={name}
        checked={isActive}
        onChange={onToggleActivation}
      />
      <label>
        <h2>{name}</h2>
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
          placeholder={`${options.adult[0]}`}
          disabled={!isActive}
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
          placeholder={`${options.child[0]}`}
          disabled={!isActive}
        />
      </section>
    </main>
  </section>
);

Room.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
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
      adult: range(1, availability.adult),
      child: range(1, availability.child)
    }
  }))
)(Room);
