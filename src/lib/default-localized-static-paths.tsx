import type { GetStaticPaths } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const { languageList } = await import("~/lib/site-data");

  return {
    paths: languageList.map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};
