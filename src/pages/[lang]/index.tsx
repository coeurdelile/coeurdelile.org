import React from "react";
import { css } from "astroturf";

import SEO from "~/components/SEO";

import logo from "~/images/logo.svg";
import twitter from "~/images/twitter.svg";
import email from "~/images/email.svg";

import siteInfo from "~/lib/site-info.server";

import type { GetStaticProps } from "next";

const twUrl = `https://twitter.com/${siteInfo.twitter.slice(1)}`;

interface PageProps {
  body: string;
  description: string;
}

const titlefont = css`
  font-family: var(--font-headings);
`;

const protocol = "mailto:";
const address = "antigentrification";
const domain = "coeurdelile.org";

const decodeEmail = (
  e: React.MouseEvent<HTMLAnchorElement> | React.TouchEvent<HTMLAnchorElement>
) => {
  e.currentTarget.href = `${protocol}${address}@${domain}`;
};

const Index = ({ body, description }: PageProps) => {
  return (
    <>
      <SEO title="Mile End Zine" description={description} />
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
        <img className="mx-auto w-2/3 mb-8" src={logo} />
        <div className="flex flex-col items-center mb-12">
          <div className="mb-4 font-bold italic">
            <a href={twUrl}>
              <img className="inline w-4 mr-3" src={twitter} />
              {siteInfo.twitter}
            </a>
          </div>
          <div className="mb-4 font-bold italic">
            <a onMouseEnter={decodeEmail} onTouchStart={decodeEmail}>
              <img className="inline w-4 mr-3" src={email} />
              {address}
              <span className="not-italic">&#64;</span>
              {domain}
            </a>
          </div>
        </div>
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
