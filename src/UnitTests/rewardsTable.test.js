import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Table from "../Components/Table/rewardsTable";

const mockData = [
  {
    yearMonth: "2023-01",
    transactions: [
      {
        transactionId: "6155120a12c4081234567890",
        customerId: 1,
        customerName: "John Smith",
        transactionDate: "2023-01-01T12:00:00-05:00",
        amount: 100.25,
        currency: "USD",
        points: 50.5,
      },
      {
        transactionId: "6155120a12c4081234567891",
        customerId: 1,
        customerName: "John Smith",
        transactionDate: "2023-01-02T12:00:00-05:00",
        amount: 100.25,
        currency: "USD",
        points: 50.5,
      },
    ],
  },
  {
    yearMonth: "2023-02",
    transactions: [
      {
        transactionId: "6155120a12c4081234567892",
        customerId: 2,
        customerName: "Jane Doe",
        transactionDate: "2023-02-01T14:30:00-05:00",
        amount: 200,
        currency: "USD",
        points: 250,
      },
    ],
  },
];

describe("Table component", () => {
  test("renders table headers correctly", () => {
    render(<Table data={mockData} />);

    const headerElements = screen.getAllByRole("columnheader");

    expect(headerElements).toHaveLength(5);
    expect(headerElements[0]).toHaveTextContent("Year-Month");
    expect(headerElements[1]).toHaveTextContent("Customer Name");
    expect(headerElements[2]).toHaveTextContent("Transaction Date");
    expect(headerElements[3]).toHaveTextContent("Transaction Amount");
    expect(headerElements[4]).toHaveTextContent("Reward Points");
  });

  test("renders table rows correctly", () => {
    render(<Table data={mockData} />);

    const rowElements = screen.getAllByRole("row");

    expect(rowElements).toHaveLength(6);
    console.log(rowElements[2]);
    expect(rowElements[1]).toHaveTextContent("2023-01");
    expect(rowElements[2]).toHaveTextContent("John Smith");
    expect(rowElements[2]).toHaveTextContent("1/1/2023 11:00:00 AM");
    expect(rowElements[2]).toHaveTextContent("100.25 USD");
    expect(rowElements[2]).toHaveTextContent("50.5");
  });

  test("clicking on column headers toggles sort direction", async () => {
    render(<Table data={mockData} />);

    fireEvent.click(screen.getByText("Transaction Date"));
    let rows = await screen.findAllByRole("row");
    expect(rows[2]).toHaveTextContent("1/1/2023 11:00:00 AM");

    fireEvent.click(screen.getByText("Transaction Date"));
    rows = await screen.findAllByRole("row");
    expect(rows[2]).toHaveTextContent("1/2/2023 11:00:00 AM");
  });

  test("sorting Year-Month works", () => {
    render(<Table data={mockData} />);

    fireEvent.click(screen.getByText("Year-Month"));
    fireEvent.click(screen.getByText("Year-Month"));
    const yearMonthCells = screen.getAllByText((content, node) => {
      const hasText = (node) => node.textContent === "Year-Month";
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node.children).every(
        (child) => !hasText(child)
      );

      return nodeHasText && childrenDontHaveText;
    });

    const yearMonthValues = yearMonthCells.map((cell) => cell.textContent);

    for (let i = 0; i < yearMonthValues.length - 1; ++i) {
      expect(yearMonthValues[i]).toBeLessThanOrEqual(yearMonthValues[i + 1]);
    }
  });

  test("Transaction Amount sorting works", () => {
    render(<Table data={mockData} />);

    fireEvent.click(screen.getByText("Transaction Amount"));

    const amountCells = screen.getAllByText((content, node) => {
      const hasText = (node) => node.textContent === "Transaction Amount";
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node.children).every(
        (child) => !hasText(child)
      );

      return nodeHasText && childrenDontHaveText;
    });

    const amountValues = amountCells.map((cell) =>
      parseFloat(cell.textContent)
    );

    for (let i = 0; i < amountValues.length - 1; ++i) {
      expect(amountValues[i]).toBeLessThanOrEqual(amountValues[i + 1]);
    }
  });
});
