"use client";
import useSWR from "swr";
const fetcher = (url: string | URL | Request) =>
    fetch(url, {
        headers: {
            Authorization: "Basic ZmxtOlhpelB5RHFQYTk1eUdkVUwoeXUhdzlqVQ==",
        },
    }).then((res) => res.json());

const useNewsAPI = (apiUrl: string) => {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_HOST_NEWS_URL}${apiUrl}`, fetcher);

    return {
        data,
        error,
        isLoading,
    };
};

export default useNewsAPI;
