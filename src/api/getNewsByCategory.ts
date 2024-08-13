export default async function getNewsByCategory(category: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST_NEWS_URL}?category=${category}`
    );
    const data = await res.json();

    return data;
  } catch (error) {
    return "Faild to fetch";
  }
}
