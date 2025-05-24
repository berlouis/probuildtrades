import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { prisma } from "@/lib/prisma";

type PageProps = {
  title: string;
  content: string;
  preview?: boolean;
};

export default function Page({ title, content, preview }: PageProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content.slice(0, 150)} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content.slice(0, 150)} />
        <meta property="og:url" content={`https://probuildtrades.com`} />
      </Head>

      {preview && (
        <div className="bg-yellow-200 text-yellow-800 px-4 py-2 rounded mb-4">
          Preview Mode Enabled – This content is not published.
        </div>
      )}
<main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await prisma.cMSPage.findMany({
    where: { isDraft: false },
    select: { slug: true },
  });

  const paths = pages.map((page) => ({
    params: { slug: page.slug },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params, preview }) => {
  const slug = params?.slug as string;

  const page = await prisma.cMSPage.findUnique({
    where: { slug },
  });

  if (!page) {
    return { notFound: true };
  }

  return {
    props: {
      title: page.title,
      content: page.content,
      preview: !!preview,
    },
    revalidate: 60,
  };
};
