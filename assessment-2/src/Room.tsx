import React, { StatelessComponent } from "react";
import classNames from "classnames";
import { range } from "lodash";
import { RoomProps } from "./interfaces";
import { getDDOptsFromVacancies } from "./utils";
import "react-dropdown/style.css";
import "./Room.scss";

const Room: StatelessComponent<RoomProps> = props => {
  const {
    name,
    label,
    isActive,
    toggleRoomActivation,
    isRequired,
    vacancies,
    requests,
    updateRoomRequests
  } = props;

  const showValidationError =
    isActive &&
    ((requests.adult.touched || requests.child.touched) && !requests.isValid);

  const options = getDDOptsFromVacancies({ vacancies });

  return (
    <section
      className={classNames("room", {
        room__disabled: !isActive,
        room__valid:
          isActive &&
          (requests.adult.touched || requests.child.touched) &&
          requests.isValid,
        room__invalid:
          isActive &&
          (requests.adult.touched || requests.child.touched) &&
          !requests.isValid
      })}
      data-testid="room"
      role="group"
    >
      <header className="room__header">
        {!isRequired && (
          <input
            type="checkbox"
            name={name}
            id={`${name}__activation`}
            checked={isActive}
            onChange={event => toggleRoomActivation({ event })}
            data-testid="room__header__checkbox"
          />
        )}
        <label htmlFor={`${name}__activation`}>
          <h2>{label}</h2>
        </label>
      </header>
      <main
        className={classNames("room__requests", {
          room__requests__active: isActive
        })}
        data-testid="room__requests"
      >
        <div role="group">
          <label htmlFor="room__requests_dropdown--adult">
            <h3>
              Adults
              <br />
              (18+)
            </h3>
          </label>
          <select
            id="room__requests_dropdown--adult"
            className="room__requests__dropdown"
            disabled={!isActive}
            data-testid="room__requests_dropdown--adult"
            onChange={event =>
              updateRoomRequests({
                name,
                data: {
                  adult: {
                    value: +(event.target as HTMLSelectElement).value,
                    touched: true
                  }
                }
              })
            }
          >
            {range(1, vacancies.adult + 1).map(value => (
              <option
                key={`room__requests__dropdown__option--adult-${value}`}
                value={value}
              >
                {value}
              </option>
            ))}
          </select>
        </div>
        <div role="group">
          <label htmlFor="room__requests_dropdown--child">
            <h3>
              Children
              <br />
              (0 - 17)
            </h3>
          </label>
          <select
            id="room__requests_dropdown--child"
            className="room__requests_dropdown"
            disabled={!isActive}
            data-testid="room__requests_dropdown--child"
            onChange={event =>
              updateRoomRequests({
                name,
                data: {
                  child: {
                    value: +(event.target as HTMLSelectElement).value,
                    touched: true
                  }
                }
              })
            }
          >
            {range(0, vacancies.child + 1).map(value => (
              <option
                key={`room__requests__dropdown__option--child-${value}`}
                value={value}
              >
                {value}
              </option>
            ))}
          </select>
        </div>
      </main>
      <footer className="room__requests__validation">
        {showValidationError && (
          <div className="room__requests__validation__message" role="alert">
            Please select at least 1 adult or child room
          </div>
        )}
      </footer>
    </section>
  );
};

export default Room;
