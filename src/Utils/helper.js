export function groupbyDate(data) {
  const groupedData = data.reduce((acc, curr) => {
    const yearMonth = curr.transactionDate.substr(0, 7);
    const index = acc.findIndex((item) => item.yearMonth === yearMonth);

    if (index !== -1) {
      acc[index].transactions.push(curr);
    } else {
      acc.push({ yearMonth, transactions: [curr] });
    }

    return acc;
  }, []);

  return groupedData;
}

export const calculateTotalRewardPoints = (transactions) => {
  return transactions.reduce((total, transaction) => {
    return total + calculateRewardPoints(transaction.amount);
  }, 0);
};

export function calculateRewardPoints(amount) {
  if (amount <= 50) {
    return 0;
  } else if (amount <= 100) {
    return amount - 50;
  } else {
    return (amount - 100) * 2 + 50;
  }
}

export function formatDate(date) {
  return new Date(date).toISOString().split("T")[0];
}
