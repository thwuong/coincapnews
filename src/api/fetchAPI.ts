export default async function fetchAPI(url: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST_URL}${url}`);
        const data = await res.json();

        return data;
    } catch (error) {
        return "Faild to fetch";
    }
}
