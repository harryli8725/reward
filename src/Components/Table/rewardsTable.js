import React, { useState } from "react";
import "./style.css";

const Table = ({ data }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const columns = [
    { title: "Year-Month", field: "yearMonth", sortable: true },
    { title: "Customer Name", field: "customerName", sortable: false },
    { title: "Transaction Date", field: "transactionDate", sortable: true },
    { title: "Transaction Amount", field: "amount", sortable: true },
  ];

  const sortData = () => {
    if (!data) {
      return [];
    }

    if (sortColumn && sortDirection) {
      let sortedData;

      if (sortColumn === "yearMonth") {
        sortedData = [...data].sort((a, b) => {
          const columnA = a[sortColumn];
          const columnB = b[sortColumn];

          if (sortDirection === "asc") {
            return columnA.localeCompare(columnB);
          } else {
            return columnB.localeCompare(columnA);
          }
        });
      } else {
        sortedData = data.map((group) => {
          const sortedTransactions = group.transactions.slice().sort((a, b) => {
            const columnA = a[sortColumn];
            const columnB = b[sortColumn];

            if (typeof columnA === "string") {
              return sortDirection === "asc"
                ? columnA.localeCompare(columnB)
                : columnB.localeCompare(columnA);
            } else {
              return sortDirection === "asc"
                ? columnA - columnB
                : columnB - columnA;
            }
          });
          return {
            ...group,
            transactions: sortedTransactions,
          };
        });
      }

      return sortedData;
    }
    return data;
  };

  const handleSort = (field) => {
    if (sortColumn === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(field);
      setSortDirection("asc");
    }
  };

  return (
    <table className="table">
      <thead className="table__head">
        <tr className="table__row">
          {columns.map((column) => (
            <th
              key={column.field}
              className={`table__header ${
                sortColumn === column.field
                  ? `table__header--${sortDirection}`
                  : ""
              }`}
              onClick={() => column.sortable && handleSort(column.field)}
            >
              {column.title}
              {column.sortable && sortColumn === column.field && (
                <span className="table__sort-indicator"></span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="table__body">
        {!data
          ? "no Data"
          : sortData().map((group) => (
              <React.Fragment key={group.yearMonth}>
                <tr className="table__row table__row--group">
                  <td className="table__cell table__cell--group" colSpan="4">
                    {group.yearMonth}
                  </td>
                </tr>
                {group.transactions?.map((row) => (
                  <tr key={row.transactionId} className="table__row">
                    <td className="table__cell">{row.yearMonth}</td>
                    <td className="table__cell">{row.customerName}</td>
                    <td className="table__cell">
                      {new Date(row.transactionDate).toLocaleDateString() +
                        " " +
                        new Date(row.transactionDate).toLocaleTimeString()}
                    </td>
                    <td className="table__cell">
                      {row.amount + " " + row.currency}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
      </tbody>
    </table>
  );
};

export default Table;
