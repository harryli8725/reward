import { fetchData } from "./fetchTransactions";

test("should fetch and group data correctly", async () => {
  const resultPromise = fetchData();
  const result = await resultPromise;
  expect(result.length).toEqual(5);
});
