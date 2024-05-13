"use client";
import useSWR from "swr";
const fetcher = (url: string | URL | Request) => fetch(url).then((res) => res.json());

const useFetchAPI = (apiUrl: string) => {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_HOST_URL}${apiUrl}`, fetcher);

    return {
        data,
        error,
        isLoading,
    };
};

export default useFetchAPI;
