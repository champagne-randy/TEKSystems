import React from "react";
import { shallow } from "enzyme";
import { render } from "react-testing-library";
import DownshiftFive from "./DownshiftFive";

describe("jest-enzyme", () => {
  it("renders without crashing", () => {
    shallow(<DownshiftFive />);
  });
});

describe("react-testing-library", () => {
  it("renders welcome message", () => {
    // const { getByText } = render(<DownshiftFive />);
    // expect(getByText("Welcome to React")).toBeInTheDocument();
  });
});
