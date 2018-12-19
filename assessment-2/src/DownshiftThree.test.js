import React from "react";
import { shallow } from "enzyme";
import { render } from "react-testing-library";
import DownshiftThree from "./DownshiftThree";

describe("jest-enzyme", () => {
  it("renders without crashing", () => {
    shallow(<DownshiftThree />);
  });
});

describe("react-testing-library", () => {
  it("renders welcome message", () => {
    // const { getByText } = render(<DownshiftThree />);
    // expect(getByText("Welcome to React")).toBeInTheDocument();
  });
});
