import React from "react";
import { shallow } from "enzyme";
import { render } from "react-testing-library";
import DownshiftFour from "./DownshiftFour";

describe("jest-enzyme", () => {
  it("renders without crashing", () => {
    shallow(<DownshiftFour />);
  });
});

describe("react-testing-library", () => {
  it("renders welcome message", () => {
    // const { getByText } = render(<DownshiftFour />);
    // expect(getByText("Welcome to React")).toBeInTheDocument();
  });
});
