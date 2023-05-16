import React, { useState, useEffect } from "react";
import Table from "./Components/Table/rewardsTable";
import SearchForm from "./Components/SearchForm/searchForm";
import useFetch from "./Hooks/useFetch";
import { fetchData } from "./Services/fetchTransactions";
import { calculateTotalRewardPoints, formatDate } from "./Utils/helper";
import "./App.css";

const App = () => {
  const {
    data: transactions,
    error,
    isLoading,
    handleFetch,
  } = useFetch(fetchData);

  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [totalRewardPoints, setTotalRewardPoints] = useState(0);

  const [query, setQuery] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    handleFetch();
  }, []);

  const filterTransactions = (item, exactMatch = false) => {
    const nameQuery = query.name.toLowerCase();
    const startDateQuery = query.startDate;
    const endDateQuery = query.endDate;

    return item.transactions.filter((transaction) => {
      const nameMatch = nameQuery
        ? exactMatch
          ? transaction.customerName.toLowerCase() === nameQuery
          : transaction.customerName.toLowerCase().includes(nameQuery)
        : true;

      const transactionDate = new Date(formatDate(transaction.transactionDate));
      const startDateMatch = startDateQuery
        ? transactionDate >= new Date(startDateQuery)
        : true;
      const endDateMatch = endDateQuery
        ? transactionDate <= new Date(endDateQuery)
        : true;

      return nameMatch && startDateMatch && endDateMatch;
    });
  };

  useEffect(() => {
    if (transactions && (query.name || query.startDate || query.endDate)) {
      const filtered = transactions
        .map((item) => ({ ...item, transactions: filterTransactions(item) }))
        .filter((item) => item.transactions.length > 0);

      const exactMatchedTransactions = transactions.flatMap((item) =>
        filterTransactions(item, true)
      );

      const totalPoints = calculateTotalRewardPoints(exactMatchedTransactions);

      setTotalRewardPoints(totalPoints);
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

        {query.name && totalRewardPoints > 0 ? (
          <h4 className="rewardPoint">
            Total Reward Points: {totalRewardPoints}
          </h4>
        ) : null}

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
