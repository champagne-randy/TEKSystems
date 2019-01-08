import React from "react";
import { shallow, mount } from "enzyme";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "react-testing-library";
import RoomRequestForm from "./RoomRequestForm";
import Room from "./Room";
import { RoomRequestFormState } from "./types";
import "jest-dom/extend-expect";

afterEach(cleanup);

describe("<RoomRequestForm />: structure", () => {
  it("renders without crashing", async () => {
    const { container } = await waitForElement(() =>
      render(<RoomRequestForm />)
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("<RoomRequestForm />: behavior", () => {
  it("room activation works as expected", async () => {
    const {
      container,
      getByTestId,
      queryAllByTestId,
      getByText,
      debug
    } = render(<RoomRequestForm />);

    expect(container.firstChild).toMatchSnapshot();

    // expect(getByTestId(/room-1__checkbox/i, { exact: false })).toBeNull;

    const checkbox2: HTMLElement = await waitForElement(
      () => getByTestId(/room-2__checkbox/i, { exact: false }),
      { container }
    );
    const checkbox3: HTMLElement = await waitForElement(
      () => getByTestId(/room-3__checkbox/i, { exact: false }),
      { container }
    );
    const checkbox4: HTMLElement = await waitForElement(
      () => getByTestId(/room-4__checkbox/i, { exact: false }),
      { container }
    );

    // initial form state
    // expect(checkbox1).toBeNull;
    expect(checkbox2).toHaveProperty("checked", false);
    expect(checkbox3).toHaveProperty("checked", false);
    expect(checkbox4).toHaveProperty("checked", false);

    // state after activating 3rd room
    fireEvent.click(checkbox3, { button: 0 });
    // expect(checkbox1).toBeNull;
    expect(checkbox2).toHaveProperty("checked", true);
    expect(checkbox3).toHaveProperty("checked", true);
    expect(checkbox4).toHaveProperty("checked", false);

    // state after deactivating 3rd room
    fireEvent.click(checkbox3, { button: 0 });
    // expect(checkbox1).toBeNull;
    expect(checkbox2).toHaveProperty("checked", true);
    expect(checkbox3).toHaveProperty("checked", false);
    expect(checkbox4).toHaveProperty("checked", false);
  });
});
