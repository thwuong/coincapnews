import { Orders } from "@/components/Orders";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    lang: string;
  };
}
export default function Page({ params }: PageProps) {
  const cookieStore = cookies();
  const token = cookieStore.get("c-token");
  if (!token?.value) redirect("/");
  return <Orders />;
}
