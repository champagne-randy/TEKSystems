import React from "react";
import { shallow } from "enzyme";
import { render } from "react-testing-library";
import DownshiftOne from "./DownshiftOne";

describe("jest-enzyme", () => {
  it("renders without crashing", () => {
    shallow(<DownshiftOne />);
  });
});

describe("react-testing-library", () => {
  it("renders welcome message", () => {
    // const { getByText } = render(<DownshiftOne />);
    // expect(getByText("Welcome to React")).toBeInTheDocument();
  });
});
