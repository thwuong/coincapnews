import { getPayloadContent } from "@/api/getPayloadContent";
import { STATIC_HOST_URL, WEBSITE_HOST_URL } from "@/app/contants";
import { useTranslation } from "@/app/i18n";
import { Container } from "@/components/Container";
import { Markdown } from "@/components/Markdown";
import { Metadata, ResolvingMetadata } from "next";
import { cookies, headers } from "next/headers";
import { cookieName } from "../i18n/settings";
import { getPathname } from "@/actions";
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
  const content = await getPayloadContent(
    `${STATIC_HOST_URL}/pages?where[slug][equals]=terms-of-use`,
    lang
  );

  // optionally access and extend (rather than replace) parent metadata
  const { title, description, openGraph } = await parent;
  return {
    title: content.meta?.title || title,
    description: content.meta?.description || description,
    openGraph: {
      images: [...(openGraph?.images || [])],
      title: content.meta?.title || title || "",
      description: content.meta?.description || description || "",
      url: `${WEBSITE_HOST_URL}/terms-of-use?lang=${lang}`,
      locale: "en-US",
      siteName: content.meta?.title,
      type: "website",
    },
    alternates: {
      canonical: `${WEBSITE_HOST_URL}/terms-of-use?lang=${lang}`,
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
    <main className="pb-24">
      <Container className="px-12">
        <Markdown
          url={`${STATIC_HOST_URL}/pages?where[slug][equals]=terms-of-use`}
        />
      </Container>
    </main>
  );
}

export default Page;
