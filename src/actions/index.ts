import { headers } from "next/headers";
export const revalidate = 0;
export const getPathname = async () => {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";
  const pathname = new URL(fullUrl).pathname.substring(1) || "";
  return pathname;
};
