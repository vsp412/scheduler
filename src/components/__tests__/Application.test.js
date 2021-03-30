import React from "react";
import axios from "axios";
import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";
import Application from "components/Application";
afterEach(cleanup);

//integration tests for checking appointment scheduling workflow
describe("Application", () => {
  
  //test to check if one can change to new day
  it("defaults to Monday and changes the schedule when a new day is selected", async() => {
    const { getByText, container } = render(<Application />);
    await waitForElement(() => getByText("Monday"));  
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  //test to check if one can create new interview
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });

  //test to check if one can delete an interview
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(day =>
      queryByText(day, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, /Are you sure you want to delete?/i)).toBeInTheDocument();
    fireEvent.click(getByText(appointment, /confirm/i));
    expect(getByText(appointment, /removing/i)).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, "Add"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();

  });

  //test to check if one can edit an interview
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(day =>
      queryByText(day, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Hank J" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    await waitForElement(() => queryByText(appointment, "Hank J"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });

  //mocking put/post axios REST API 
  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });

  //mocking delete axios REST API 
  it("shows the delete error when failing to save an appointment", () => {
    axios.delete.mockRejectedValueOnce();
  });
});
