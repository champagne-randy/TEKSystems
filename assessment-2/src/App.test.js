import React from "react";
import { shallow } from "enzyme";
import { render } from "react-testing-library";
import App from "./App";

describe("jest-enzyme", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });

  it("renders welcome message", () => {
    const wrapper = shallow(<App />);
    const welcome = <h2>Welcome to React</h2>;
    // expect(wrapper.contains(welcome)).toBe(true);
    expect(wrapper.contains(welcome)).toEqual(true);
  });
});

describe("react-testing-library", () => {
  it("renders welcome message", () => {
    const { getByText } = render(<App />);
    expect(getByText("Welcome to React")).toBeInTheDocument();
  });
});
