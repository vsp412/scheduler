import React from "react";
import { render, cleanup } from "@testing-library/react";
import Appointment from "components/Appointment";
afterEach(cleanup);

//basic test in Jest to check if rendering properly
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});

