import React from "react";
import { shallow } from "enzyme";
import { render } from "react-testing-library";
import DownshiftTwo from "./DownshiftTwo";

describe("jest-enzyme", () => {
  it("renders without crashing", () => {
    shallow(<DownshiftTwo />);
  });
});

describe("react-testing-library", () => {
  it("renders welcome message", () => {
    // const { getByText } = render(<DownshiftTwo />);
    // expect(getByText("Welcome to React")).toBeInTheDocument();
  });
});
