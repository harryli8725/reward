import React, { useState, useEffect } from "react";
import Table from "./Components/Table/rewardsTable";
import SearchForm from "./Components/SearchForm/searchForm";
import useFetch from "./Hooks/useFetch";
import { fetchData } from "./Services/fetchTransactions";
import "./App.css";

const App = () => {
  const {
    data: transactions,
    error,
    isLoading,
    handleFetch,
  } = useFetch(fetchData);

  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [query, setQuery] = useState({
    name: "",
    date: "",
  });

  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    if ((query.name !== "" || query.date !== "") && transactions !== null) {
      const filtered = transactions
        .map((item) => {
          const filteredTransactions = item.transactions.filter(
            (transaction) => {
              const nameMatch =
                query.name !== ""
                  ? transaction.customerName
                      .toLowerCase()
                      .includes(query.name.toLowerCase())
                  : true;
              const dateMatch =
                query.date !== ""
                  ? transaction.transactionDate === query.date
                  : true; // Allow all transactions if query date is empty

              return nameMatch && dateMatch;
            }
          );

          return { ...item, transactions: filteredTransactions };
        })
        .filter((item) => item.transactions.length > 0); // Remove items with no transactions after filtering

      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  }, [transactions, query]);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <span>something went wrong</span>;
  }

  return (
    <>
      <div className="p-4">
        <div className="card">
          <div className="card__header">Search Transactions</div>
          <div className="card__body">
            <SearchForm query={query} setQuery={setQuery} />
          </div>
        </div>
        {filteredTransactions ? (
          <Table data={filteredTransactions} />
        ) : (
          "no data"
        )}
      </div>
    </>
  );
};

export default App;
