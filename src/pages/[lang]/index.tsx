import React from "react";
import { css } from "astroturf";

import SEO from "~/components/SEO";

import logo from "~/images/logo.svg";

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
      <img className="absolute top-4 left-4 w-16" src={logo} />
      <div className="mx-auto px-4 mt-16 mb-10">
        <header
          className={`text-center font-bold italic uppercase ${titlefont}`}
        >
          <div className="text-3xl lg:text-4xl">A</div>
          <div className="text-5xl lg:text-6xl">Brief History</div>
          <div className="text-3xl lg:text-4xl lowercase">of</div>
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            Gentri&shy;fication
          </div>
          <div className="text-3xl lg:text-4xl lowercase">in</div>
          <div className="text-5xl lg:text-6xl">Mile End</div>
        </header>
      </div>

      <div className="max-w-xl mx-auto px-4 mb-16">
        <img className="mx-auto w-full mb-10" src="/images/peckbldg.png" />
        <article
          className="prose max-w-xl mb-12"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <img className="mx-auto w-2/3" src={logo} />
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
