import { WEBSITE_HOST_URL } from "@/app/contants";
import { useTranslation } from "@/app/i18n";
import { Container } from "@/components/Container";
import { NewsFeed } from "@/components/NewsFeed";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import { cookieName } from "../i18n/settings";
interface PageProps {
  params: {
    lang: string;
  };
}
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const cookieStore = cookies();
  const lang = cookieStore.get(cookieName)?.value || "en";
  // fetch data
  const content = {
    meta: {
      title: "Knowledge | Coincapnews",
      description: "",
    },
  };
  // optionally access and extend (rather than replace) parent metadata
  const { title, description, openGraph } = await parent;
  return {
    title: content.meta?.title || title,
    description: content.meta?.description || description,
    openGraph: {
      images: [...(openGraph?.images || [])],
      title: content.meta?.title || title || "",
      description: content.meta?.description || description || "",
      url: `${WEBSITE_HOST_URL}/knowledge?lang=${lang}`,
      locale: "en-US",
      siteName: content.meta?.title,
      type: "website",
    },
    alternates: {
      canonical: `${WEBSITE_HOST_URL}/knowledge?lang=${lang}`,
    },
    twitter: {
      title: content.meta?.title,
      description: content.meta?.description,
      images: [...(openGraph?.images || [])],
      card: "summary_large_image",
    },
  };
}
async function Page(props: PageProps) {
  const { t } = await useTranslation(props.params.lang);

  return (
    <main className="pb-24 pt-8">
      <Container className="px-12">
        <NewsFeed category="crypto-insights" titleKey="knowledge" />
      </Container>
    </main>
  );
}

export default Page;
