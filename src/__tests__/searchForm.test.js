import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SearchForm from "../Components/SearchForm/searchForm";

const mockQuery = {
  name: "",
  startDate: "",
  endDate: "",
};

const setQuery = jest.fn();

describe("SearchForm Component", () => {
  test("renders SearchForm component", () => {
    render(<SearchForm query={mockQuery} setQuery={setQuery} />);
    expect(screen.getByLabelText(/Customer Name:/i)).toBeInTheDocument();
  });

  test("input fields update on change", () => {
    render(<SearchForm query={mockQuery} setQuery={setQuery} />);

    fireEvent.change(screen.getByLabelText(/Customer Name:/i), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByLabelText(/Start Date:/i), {
      target: { value: "2023-01-01" },
    });

    fireEvent.change(screen.getByLabelText(/End Date:/i), {
      target: { value: "2023-12-31" },
    });

    expect(setQuery).toHaveBeenCalledTimes(3);
  });

  test("clear button resets the form", () => {
    render(<SearchForm query={mockQuery} setQuery={setQuery} />);

    fireEvent.click(screen.getByText(/Clear/i));

    expect(setQuery).toHaveBeenCalledWith({
      name: "",
      startDate: "",
      endDate: "",
    });
  });
});
