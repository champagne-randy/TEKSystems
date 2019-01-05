import styled, { css } from "./styled-components";
import { RoomProps } from "./interfaces";

export const StyledRoom = styled("section")<RoomProps>`
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
