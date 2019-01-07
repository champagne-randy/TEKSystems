import React from "react";
import { mount } from "enzyme";
import { render } from "react-testing-library";
import logo from "./logo.svg";
import App from "./App";

describe("<App />: structure", () => {
  it("renders <App/> without crashing", () => {
    mount(<App />);
  });

  it.skip("renders Hilton logo", () => {
    const wrapper = mount(<App />);
    const _logo = <img src={logo} />;
    expect(wrapper.contains(_logo)).toEqual(true);
  });

  it("renders app title", () => {
    const { getByText } = render(<App />);
    expect(getByText("Hilton Assessment 2")).toBeInTheDocument();
  });
});
