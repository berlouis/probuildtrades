import { prisma } from '@/lib/prisma';

export async function getStaticPaths() {
  const pages = await prisma.page.findMany();
  const paths = pages.map((page) => ({
    params: { slug: page.slug },
  }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const page = await prisma.page.findUnique({
    where: { slug: params.slug },
  });

  if (!page) {
    return { notFound: true };
  }

  return {
    props: {
      page,
    },
    revalidate: 10,
  };
}

export default function Page({ page }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: page.content }} />
  );
}
