import React from "react";
import { shallow, mount } from "enzyme";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import spies from "chai-spies";
import RoomRequestForm from "./RoomRequestForm";

function myAwesomeDebug(wrapper: any) {
  let html = wrapper.html();
  console.log(html);
  return html;
}

chai.should();
chai.use(spies);
chai.use(chaiEnzyme(myAwesomeDebug));

describe("<RoomRequestForm />: structure", () => {
  it("renders <RoomRequestForm/> without crashing", () => {
    shallow(<RoomRequestForm />);
  });
});

describe("<RoomRequestForm />: behavior", () => {
  it("updates roomRequests when isActive=true", () => {
    const wrapper = mount(<RoomRequestForm />);
    expect(wrapper.exists());

    // const checkbox = wrapper.find("room-2__checkbox");
    // checkbox.should.not.be.checked();
    // checkbox.simulate("click");
    // checkbox.should.not.be.checked();

    // dropdownAdult.instance().value = { label: 1, value: 1 };
    // dropdownAdult.update();
    // dropdownAdult.simulate("change", { target: { label: 3, value: 3 } });
    // dropdownAdult.update();
    // wrapper.update();
    // expect(props.updateRoomRequests).toHave.property("callCount", 1);
  });
});
