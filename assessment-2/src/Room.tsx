import React, { StatelessComponent } from "react";
import styled, { css } from "./styled-components";
import { range } from "lodash";
import { RoomProps } from "./types";

const Section = styled("section")<{ isActive?: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 5px;
  border: solid 5px #e7e7e7;
  background-color: #e7e7e7;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: space-around;
  font-size: 9px;
  ${props =>
    !props.isActive &&
    css`
      border-color: #cdd0df;
      background-color: #dbdbe3;
    `}
`;

const Header = styled("header")`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const Checkbox = styled("input")`
  margin-right: 5px;
`;

const Main = styled("main")<{ isActive?: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  ${props =>
    !props.isActive &&
    css`
      background-color: #ffffff;
    `}
`;

const Fieldset = styled("div")`
  width: 50%;
`;

const Dropdown = styled("select")<{ isActive?: boolean }>`
  ${props =>
    !props.isActive &&
    css`
      background-color: #f0f0f0;
    `}
`;

const H3 = styled("h3")`
  margin-top: 0;
`;

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

  return (
    <Section isActive={isActive} data-testid="room" role="group">
      <Header className="room__header">
        {!isRequired && (
          <Checkbox
            type="checkbox"
            name={name}
            id={`${name}__activation`}
            checked={isActive}
            onChange={event => toggleRoomActivation({ event })}
            onBlur={event => toggleRoomActivation({ event })}
            data-testid="room__header__checkbox"
          />
        )}
        <label htmlFor={`${name}__activation`}>
          <h2>{label}</h2>
        </label>
      </Header>
      <Main data-testid="room__requests">
        <Fieldset role="group">
          <label htmlFor="room__requests_dropdown--adult">
            <H3>
              Adults
              <br />
              (18+)
            </H3>
          </label>
          <Dropdown
            id="room__requests_dropdown--adult"
            className="room__requests__dropdown"
            disabled={!isActive}
            data-testid="room__requests_dropdown--adult"
            value={requests.adult}
            onChange={event =>
              updateRoomRequests({
                name,
                data: {
                  adult: +(event.target as HTMLSelectElement).value
                }
              })
            }
            onBlur={event =>
              updateRoomRequests({
                name,
                data: {
                  adult: +(event.target as HTMLSelectElement).value
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
          </Dropdown>
        </Fieldset>
        <Fieldset role="group">
          <label htmlFor="room__requests_dropdown--child">
            <H3>
              Children
              <br />
              (0 - 17)
            </H3>
          </label>
          <Dropdown
            id="room__requests_dropdown--child"
            className="room__requests_dropdown"
            disabled={!isActive}
            data-testid="room__requests_dropdown--child"
            value={requests.child}
            onChange={event =>
              updateRoomRequests({
                name,
                data: {
                  child: +(event.target as HTMLSelectElement).value
                }
              })
            }
            onBlur={event =>
              updateRoomRequests({
                name,
                data: {
                  child: +(event.target as HTMLSelectElement).value
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
          </Dropdown>
        </Fieldset>
      </Main>
    </Section>
  );
};

export default Room;
