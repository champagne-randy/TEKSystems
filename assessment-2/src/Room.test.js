import React from "react";
import { shallow } from "enzyme";
import { render } from "react-testing-library";
import Room from "./Room";

it("renders <Room/> without crashing", () => {
  shallow(<Room />);
});

// it("renders Hilton logo", () => {
//   const wrapper = shallow(<Room />);
//   const _logo = <img src={logo} className="Room-logo" alt="logo" />;
//   expect(wrapper.contains(_logo)).toEqual(true);
// });
//
// it("renders app title", () => {
//   const { getByText } = render(<Room />);
//   expect(getByText("Hilton Assessment 2")).toBeInTheDocument();
// });
