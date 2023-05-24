import { render, waitFor, screen } from "@testing-library/react";
import useFetch from "../Hooks/useFetch";
import React, { useEffect } from "react";

test("useFetch performs a fetch and sets the data", async () => {
  const fetcher = jest.fn().mockResolvedValue("test data");

  const TestComponent = () => {
    const { data, error, isLoading, handleFetch } = useFetch(fetcher);

    useEffect(() => {
      handleFetch();
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return <div>{data}</div>;
  };

  render(<TestComponent />);

  expect(fetcher).toHaveBeenCalled();

  await waitFor(
    () => expect(screen.getByText("test data")).toBeInTheDocument(),
    { timeout: 3000 }
  );
});
