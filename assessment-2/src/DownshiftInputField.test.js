import React from "react";
import { shallow } from "enzyme";
import { render } from "react-testing-library";
import DownshiftInputField from "./DownshiftInputField";

describe("jest-enzyme", () => {
  it("renders without crashing", () => {
    shallow(<DownshiftInputField />);
  });
});

describe("react-testing-library", () => {
  it("renders welcome message", () => {
    // const { getByText } = render(<DownshiftInputField />);
    // expect(getByText("Welcome to React")).toBeInTheDocument();
  });
});
