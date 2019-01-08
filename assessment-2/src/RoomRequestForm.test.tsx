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
  it("renders <RoomRequestForm/> without crashing", () => {
    const wrapper = mount(<RoomRequestForm />);
    expect(wrapper.exists());
  });
});

describe("<RoomRequestForm />: behavior", () => {
  it("renders <RoomRequestForm/> without crashing", async () => {
    const {
      container,
      getByTestId,
      debug,
      queryAllByTestId
    } = await waitForElement(() => render(<RoomRequestForm />));

    const checkboxes = await waitForElement(() =>
      queryAllByTestId(/checkbox/i, { exact: false })
    );
    // const checkboxes = queryAllByTestId(/checkbox/, { exact: false });
    console.dir(checkboxes);
    expect(checkboxes).toHaveLength(4);
  });

  it.skip("updates roomRequests when isActive=true", () => {});
});
