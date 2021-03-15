import React from "react";
import { css } from "astroturf";

import SEO from "~/components/SEO";

import type { GetStaticProps } from "next";

interface PageProps {
  body: string;
  description: string;
}

const titlefont = css`
  font-family: var(--font-headings);
`;

const Index = ({ body, description }: PageProps) => {
  return (
    <>
      <SEO title="Zine" description={description} />
      <div className="mx-auto px-4 mt-4 mb-10">
        <header
          className={`text-center font-bold italic uppercase ${titlefont}`}
        >
          <div className="text-3xl lg:text-4xl">A</div>
          <div className="text-5xl lg:text-6xl">Short History</div>
          <div className="text-3xl lg:text-4xl lowercase">of</div>
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            Gentri&shy;fication
          </div>
          <div className="text-3xl lg:text-4xl lowercase">in</div>
          <div className="text-5xl lg:text-6xl">Mile End</div>
        </header>
      </div>

      <div className="max-w-xl mx-auto px-4 mb-16">
        <article
          className="prose max-w-xl"
          dangerouslySetInnerHTML={{ __html: body }}
        />
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
