const transactions = [
  {
    transactionId: "6155120a12c4081234567890",
    customerId: 1,
    customerName: "John Smith",
    transactionDate: "2022-01-01T12:00:00-05:00",
    amount: 100.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567891",
    customerId: 2,
    customerName: "Jane Doe",
    transactionDate: "2022-01-02T14:30:00-05:00",
    amount: 200.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567892",
    customerId: 1,
    customerName: "John Smith",
    transactionDate: "2022-02-01T10:15:00-05:00",
    amount: 150.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567893",
    customerId: 3,
    customerName: "Bob Johnson",
    transactionDate: "2022-02-02T16:45:00-05:00",
    amount: 75.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567894",
    customerId: 1,
    customerName: "John Smith",
    transactionDate: "2022-03-01T09:00:00-05:00",
    amount: 125.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567895",
    customerId: 6,
    customerName: "Sue Davis",
    transactionDate: "2022-03-02T13:45:00-05:00",
    amount: 250.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567896",
    customerId: 2,
    customerName: "Jane Doe",
    transactionDate: "2022-04-01T11:30:00-05:00",
    amount: 175.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567897",
    customerId: 6,
    customerName: "Sue Davis",
    transactionDate: "2022-04-02T15:00:00-05:00",
    amount: 300.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567898",
    customerId: 3,
    customerName: "Bob Johnson",
    transactionDate: "2022-05-01T10:00:00-05:00",
    amount: 225.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567899",
    customerId: 2,
    customerName: "Jane Doe",
    transactionDate: "2022-05-02T14:15:00-05:00",
    amount: 175.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567900",
    customerId: 4,
    customerName: "Alice Johnson",
    transactionDate: "2022-06-01T10:00-05:00",
    amount: 250.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567901",
    customerId: 1,
    customerName: "John Smith",
    transactionDate: "2022-06-02T14:15:00-05:00",
    amount: 175.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567902",
    customerId: 5,
    customerName: "Tom Lee",
    transactionDate: "2022-07-01T11:00:00-05:00",
    amount: 300.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567903",
    customerId: 7,
    customerName: "Jack Jones",
    transactionDate: "2022-07-02T13:30:00-05:00",
    amount: 150.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567904",
    customerId: 2,
    customerName: "Jane Doe",
    transactionDate: "2022-08-01T09:15:00-05:00",
    amount: 200.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567905",
    customerId: 8,
    customerName: "Mary Williams",
    transactionDate: "2022-08-02T12:45:00-05:00",
    amount: 125.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567906",
    customerId: 3,
    customerName: "Bob Johnson",
    transactionDate: "2022-09-01T11:00:00-05:00",
    amount: 175.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567907",
    customerId: 6,
    customerName: "Sue Davis",
    transactionDate: "2022-09-02T14:30:00-05:00",
    amount: 225.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567908",
    customerId: 4,
    customerName: "Alice Johnson",
    transactionDate: "2022-10-01T10:30:00-05:00",
    amount: 100.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567909",
    customerId: 9,
    customerName: "David Brown",
    transactionDate: "2022-10-02T16:00:00-05:00",
    amount: 275.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567910",
    customerId: 5,
    customerName: "Tom Lee",
    transactionDate: "2022-11-01T10:00:00-05:00",
    amount: 150.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567911",
    customerId: 10,
    customerName: "Emily Davis",
    transactionDate: "2022-11-02T14:00:00-05:00",
    amount: 200.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567912",
    customerId: 3,
    customerName: "Bob Johnson",
    transactionDate: "2022-12-01T09:30:00-05:00",
    amount: 125.0,
    currency: "USD",
  },
  {
    transactionId: "6155120a12c4081234567913",
    customerId: 8,
    customerName: "Mary Williams",
    transactionDate: "2022-12-02T11:45:00-05:00",
    amount: 175.0,
    currency: "USD",
  },
];

function groupData(data) {
  const groupedData = data.reduce((acc, curr) => {
    const yearMonth = curr.transactionDate.substr(0, 7); // Extract year and month from date string
    const index = acc.findIndex((item) => item.yearMonth === yearMonth); // Check if item already exists in array

    if (index !== -1) {
      acc[index].transactions.push(curr); // Add transaction to existing group
    } else {
      acc.push({ yearMonth, transactions: [curr] }); // Create new group
    }

    return acc;
  }, []);

  return groupedData;
}

export function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(groupData(transactions));
    }, 1000); // Simulating a delay of 1 second (1000 milliseconds)
  });
}
