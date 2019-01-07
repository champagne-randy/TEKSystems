import React from "react";
import { mount } from "enzyme";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import spies from "chai-spies";
import { RoomProps } from "./types";
import Room from "./Room";

function myAwesomeDebug(wrapper: any) {
  let html = wrapper.html();
  // console.log(html);
  return html;
}

chai.should();
chai.use(spies);
chai.use(chaiEnzyme(myAwesomeDebug));

const setup = (propOverrides?: RoomProps) => {
  const room = {
    name: "room-1",
    key: "room1",
    label: "Room 1",
    vacancies: {
      adult: 5,
      child: 3
    }
  };

  const props: RoomProps = {
    name: room.name,
    label: room.label,
    isActive: true,
    isRequired: false,
    toggleRoomActivation: jest.fn(),
    requests: { adult: 0, child: 0 },
    updateRoomRequests: chai.spy,
    vacancies: room.vacancies,
    ...propOverrides
  };

  const wrapper = mount(<Room {...props} />);

  return {
    wrapper,
    toggleRoomActivation: props.toggleRoomActivation,
    checkbox: wrapper.find(`input[data-testid='${room.name}__checkbox']`),
    dropdownAdult: wrapper.find(
      "select[data-testid='room-1__requests--adult']"
    ),
    dropdownChild: wrapper.find("select[data-testid='room-1__requests--child']")
  };
};

describe("<Room />: structure", () => {
  it("does not render checkbox when isRequired=true", () => {
    const { wrapper, checkbox } = setup({
      isRequired: true
    });
    expect(wrapper.exists());
    expect(checkbox.exists()).toBe(false);
  });

  it("is enabled when isActive=true", () => {
    const { wrapper, checkbox, dropdownAdult, dropdownChild } = setup();

    expect(wrapper.exists());
    expect(checkbox.exists());
    expect(dropdownAdult.exists());
    expect(dropdownChild.exists());
  });

  it("is disabled when isActive=false and isRequired=false", () => {
    const { wrapper, checkbox, dropdownAdult, dropdownChild } = setup({
      isActive: false
    });

    expect(wrapper.exists());
    expect(checkbox.exists());
    expect(dropdownAdult.exists());
    expect(dropdownChild.exists());
  });
});

describe("<Room />: behavior", () => {
  it("activates a disabled room", () => {
    const { wrapper, checkbox, toggleRoomActivation } = setup({
      isActive: false
    });
    expect(wrapper.exists());

    checkbox.should.not.be.checked();
    expect(toggleRoomActivation.mock.calls.length).toBe(0);
    checkbox.simulate("change", { target: { checked: true } });
    // checkbox.simulate("click");
    checkbox.should.be.checked();
    expect(toggleRoomActivation.mock.calls.length).toBe(1);
  });
});
