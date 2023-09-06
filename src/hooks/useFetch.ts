import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useFetch = function (url: string, options: any) {
  const baseUrl = `https://conduit.productionready.io/api`;

  const fetchQuery = () =>
    fetch(baseUrl + url, options)
      .then((res) => res.json())
      .catch((error) => console.log(error));

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchQuery,
    enabled: false,
  });

  return { isLoading, error, data, refetch };
};

export default useFetch;
