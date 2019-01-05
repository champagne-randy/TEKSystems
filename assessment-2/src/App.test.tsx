import React from "react";
import { shallow, mount } from "enzyme";
import { render } from "react-testing-library";
import logo from "./logo.svg";
import App from "./App";

const setup = propOverrides => {
  const rooms = [
    {
      name: "room-1",
      key: "room1",
      label: "Room 1",
      vacancies: {
        adult: 5,
        child: 3
      }
    }
  ];

  const props = {
    ...propOverrides
  };

  const wrapper = mount(<App {...props} />);

  return {
    wrapper
  };
};

describe("<App />: structure", () => {
  it("renders <App/> without crashing", () => {
    shallow(<App />);
  });

  it("renders Hilton logo", () => {
    const wrapper = shallow(<App />);
    const _logo = <img src={logo} className="App-logo" alt="logo" />;
    expect(wrapper.contains(_logo)).toEqual(true);
  });

  it("renders app title", () => {
    const { getByText } = render(<App />);
    expect(getByText("Hilton Assessment 2")).toBeInTheDocument();
  });
});

describe.skip("<App />: behavior", () => {
  it("updates roomRequests when isActive=true", () => {
    const { wrapper, props, dropdownAdult, dropdownChild } = setup({
      isActive: true
    });

    dropdownAdult.instance().value = { label: 1, value: 1 };
    dropdownAdult.update();
    dropdownAdult.simulate("change", { target: { label: 3, value: 3 } });
    dropdownAdult.update();
    expect(wrapper.exists());
    wrapper.update();
    expect(props.updateRoomRequests).toHave.property("callCount", 1);
  });
});
