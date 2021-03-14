import React from "react";

import SEO from "~/components/SEO";
import Hero from "~/components/Hero";

import type { GetStaticProps } from "next";

interface PageProps {
  body: string;
  description: string;
}

const Index = ({ body, description }: PageProps) => {
  return (
    <>
      <SEO
        title="Groupe de recherche du Cœur-de-l'Île — Zine"
        description={description}
      />
      {/* <Hero /> */}
      <div className="flex justify-center px-4">
        <article className="prose" dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps,
  { lang: string }
> = async ({ params }) => {
  const { loadMdx } = await import("~/lib/load-mdx");
  const { lang } = params!;

  const path = `content/pages/home/home.${lang}.md`;

  const { contents, attributes } = await loadMdx(path);

  const description = attributes["description"];

  if (!description) {
    throw new Error(`description must not be empty! (in ${path})`);
  }

  return {
    props: {
      body: contents,
      description,
    },
  };
};

export { getStaticPaths } from "~/lib/default-localized-static-paths";

export default Index;
