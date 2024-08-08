import useSWR from "swr";
const fetcher = (url: string | URL | Request, init?: RequestInit | undefined) =>
  fetch(url, init).then((res) => {
    return res.json();
  });
const useFetchAPI = (apiUrl: string, init?: RequestInit | undefined) => {
  const formattedUrl = apiUrl.startsWith("https")
    ? apiUrl
    : `${process.env.NEXT_PUBLIC_API_HOST_URL}${apiUrl}`;
  const { data, error, isLoading } = useSWR(
    [formattedUrl, init],
    ([url, init]) => fetcher(url, init)
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useFetchAPI;
