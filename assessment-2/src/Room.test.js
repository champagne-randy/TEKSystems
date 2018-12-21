import React from "react";
import { mount } from "enzyme";
import Room from "./Room";
// import sinon from "sinon";

const setup = propOverrides => {
  const room = {
    name: "room-1",
    key: "room1",
    label: "Room 1",
    availability: {
      adult: 5,
      child: 3
    }
  };

  const props = {
    name: room.name,
    label: room.label,
    isActive: true,
    isRequired: false,
    onToggleActivation: jest.fn(),
    requestedRooms: { adult: 0, child: 0 },
    updateRequestedRooms: jest.fn(),
    availability: room.availability,
    ...propOverrides
  };

  const wrapper = mount(<Room {...props} />);

  return {
    wrapper,
    props,
    checkbox: wrapper.find("[data-testid='room__header__checkbox']"),
    roomRequests: wrapper.find("[data-testid='room__requests']"),
    dropdownAdult: wrapper.find(
      "[data-testid='room__requests_dropdown--adult']"
    ),
    dropdownChild: wrapper.find(
      "[data-testid='room__requests_dropdown--child']"
    )
  };
};

describe("<Room />: structure", () => {
  it("is enabled when isRequired=true & isActive=true", () => {
    const {
      wrapper,
      checkbox,
      roomRequests,
      dropdownAdult,
      dropdownChild
    } = setup({
      isRequired: true
    });

    expect(wrapper.exists());
    expect(checkbox.exists()).toBe(false);
    expect(dropdownAdult.exists());
    expect(dropdownChild.exists());

    expect(roomRequests.hasClass("room__requests__active"));
    expect(dropdownAdult.hasClass("Dropdown-disabled")).toBe(false);
    expect(dropdownChild.hasClass("Dropdown-disabled")).toBe(false);
  });

  it.skip("is enabled when isRequired=true & isActive=false", () => {});

  it("is enabled when isActive=true", () => {
    const {
      wrapper,
      checkbox,
      roomRequests,
      dropdownAdult,
      dropdownChild
    } = setup({
      isActive: true
    });

    expect(wrapper.exists());
    expect(checkbox.exists());
    expect(dropdownAdult.exists());
    expect(dropdownChild.exists());

    expect(roomRequests.hasClass("room__requests__active"));
    expect(dropdownAdult.hasClass("Dropdown-disabled")).toBe(false);
    expect(dropdownChild.hasClass("Dropdown-disabled")).toBe(false);
  });

  it("is disabled when isActive=false", () => {
    const {
      wrapper,
      checkbox,
      roomRequests,
      dropdownAdult,
      dropdownChild
    } = setup({
      isActive: false
    });

    expect(wrapper.exists());
    expect(checkbox.exists());
    expect(dropdownAdult.exists());
    expect(dropdownChild.exists());

    expect(roomRequests.hasClass("room__requests__active")).toBe(false);
    expect(dropdownAdult.hasClass("Dropdown-disabled"));
    expect(dropdownChild.hasClass("Dropdown-disabled"));
  });
});

describe("<Room />: behavior", () => {
  it.skip("updates roomRequests when isActive=true", () => {
    const { wrapper, props, dropdownAdult, dropdownChild } = setup({
      isActive: true
    });

    dropdownAdult.instance().value = 1;
    dropdownAdult.simulate("change", { target: { value: 3 } });
    // expect(dropdownAdult.prop("value")).to.equal(3);
    // dropdownAdult.simulate("click");
    // expect(wrapper.updateRequestedRooms).toHave.property("callCount", 1);
    expect(wrapper.prop("updateRequestedRooms")).toHaveBeenCalledTimes(1);
  });
});
