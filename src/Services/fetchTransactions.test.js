import { fetchData } from "./fetchTransactions"; // Replace 'yourModule' with the actual module path

test("should fetch and group data correctly", async () => {
  // Call the fetchData function
  const resultPromise = fetchData();

  // Wait for the promise to resolve
  const result = await resultPromise;

  console.log(result.length);
  // Assert the result
  expect(result.length).toEqual(5);
});
