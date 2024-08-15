import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    id: string;
    lang: string;
  };
}
const Auth = dynamic(() => import("@/components/Auth").then((mod) => mod.Auth));
export default function Page({ params }: PageProps) {
  const cookieStore = cookies();
  const token = cookieStore.get("c-token");
  if (token?.value) redirect("/");
  return <Auth />;
}
