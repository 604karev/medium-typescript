import { useQuery } from "@tanstack/react-query";

const useFetch = function (url: string, options: any) {
  const baseUrl = `https://conduit.productionready.io/api`;
  const fetchQuery = () =>
    fetch(baseUrl + url, options)
      .then((res) => res.json())
      .catch((error) => console.log(error));

  const { isLoading, error, data } = useQuery({
    queryKey: ["weatherData"],
    queryFn: fetchQuery,
    enabled: false,
  });

  return { isLoading, error, data, fetchQuery };
};

export default useFetch;
