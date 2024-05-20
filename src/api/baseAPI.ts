import useSWR from "swr";
const fetcher = (url: string | URL | Request, init?: RequestInit | undefined) =>
    fetch(url, init).then((res) => res.json());

const useFetchAPI = (apiUrl: string, init?: RequestInit | undefined) => {
    const { data, error, isLoading } = useSWR(
        [`${process.env.NEXT_PUBLIC_API_HOST_URL}${apiUrl}`, init],
        ([url, init]) => fetcher(url, init)
    );

    return {
        data,
        error,
        isLoading,
    };
};

export default useFetchAPI;
