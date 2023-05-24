import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import useFetch from "../Hooks/useFetch";
import { groupbyYearMonth } from "../Utils/helper";

jest.mock("../Hooks/useFetch");
jest.mock("../Services/fetchTransactions");

describe("App Component", () => {
  test("renders App component", async () => {
    useFetch.mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      handleFetch: jest.fn(),
    });

    render(<App />);
    expect(screen.getByText(/Search Transactions/i)).toBeInTheDocument();
  });

  test("shows loading when fetching data", async () => {
    useFetch.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
      handleFetch: jest.fn(),
    });

    render(<App />);
    expect(screen.getByTestId("loader-container")).toBeInTheDocument();
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("shows error when there is an error fetching data", async () => {
    useFetch.mockReturnValue({
      data: null,
      error: "error",
      isLoading: false,
      handleFetch: jest.fn(),
    });

    render(<App />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  test("displays fetched data", async () => {
    const dummyData = [
      {
        transactionId: "6155120a12c4081234567890",
        customerId: 1,
        customerName: "John Smith",
        transactionDate: "2023-01-01T12:00:00-05:00",
        amount: 100.0,
        currency: "USD",
      },
      {
        transactionId: "6155120a12c4081234567891",
        customerId: 2,
        customerName: "Jane Doe",
        transactionDate: "2023-01-02T14:30:00-05:00",
        amount: 200.0,
        currency: "USD",
      },
      {
        transactionId: "6155120a12c4081234567892",
        customerId: 1,
        customerName: "John Smith",
        transactionDate: "2023-02-01T10:15:00-05:00",
        amount: 150.0,
        currency: "USD",
      },
    ];

    const groupedData = groupbyYearMonth(dummyData);

    useFetch.mockReturnValue({
      data: groupedData,
      error: null,
      isLoading: false,
      handleFetch: jest.fn(),
    });

    render(<App />);
    await waitFor(() => {
      const tableCellsWithJohnSmith = screen.getAllByText("John Smith");
      expect(tableCellsWithJohnSmith.length).toBeGreaterThan(0);
    });
  });

  test("filters data correctly", async () => {
    const dummyData = [
      {
        transactionId: "6155120a12c4081234567890",
        customerId: 1,
        customerName: "John Smith",
        transactionDate: "2023-01-01T12:00:00-05:00",
        amount: 100.0,
        currency: "USD",
      },
      {
        transactionId: "6155120a12c4081234567891",
        customerId: 2,
        customerName: "Jane Doe",
        transactionDate: "2023-01-02T14:30:00-05:00",
        amount: 200.0,
        currency: "USD",
      },
      {
        transactionId: "6155120a12c4081234567892",
        customerId: 1,
        customerName: "John Smith",
        transactionDate: "2023-02-01T10:15:00-05:00",
        amount: 150.0,
        currency: "USD",
      },
    ];

    const groupedData = groupbyYearMonth(dummyData);

    useFetch.mockReturnValue({
      data: groupedData,
      error: null,
      isLoading: false,
      handleFetch: jest.fn(),
    });

    render(<App />);
    const nameInput = screen.getByLabelText(/Customer Name/i);
    const startDateInput = screen.getByLabelText(/Start Date/i);
    const endDateInput = screen.getByLabelText(/End Date/i);

    userEvent.type(nameInput, "John Smith");
    userEvent.type(startDateInput, "2023-01-01");
    userEvent.type(endDateInput, "2023-02-01");

    await waitFor(() => {
      expect(screen.getAllByText(/John Smith/i).length).toBeGreaterThan(0);
      expect(screen.queryByText(/Jane Doe/i)).not.toBeInTheDocument();
    });
  });
});
