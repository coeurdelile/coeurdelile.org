import { promises as fs } from "fs";
import renderToString from "next-mdx-remote/render-to-string";
import remark from "remark";
import strip from "strip-markdown";
import yaml from "js-yaml";

import { components } from "~/components/mdx";

const mdx = (content: string) => renderToString(content, { components });

export async function loadMdx(filename: string, expectedFields?: string[]) {
  const file = await fs.readFile(filename, "utf-8");
  const contents = yaml.load(file) as Record<string, any>;
  if (expectedFields) {
    for (const field of expectedFields) {
      if (!(field in contents)) {
        throw new Error(
          `Expected a field "${field}" in frontmatter for file "${filename}"!`
        );
      }
    }
  }

  return contents;
}

export async function processSections(contents: {
  sections: { body: string; [fields: string]: unknown }[];
}) {
  const { contents: plaintext } = await remark()
    .use(strip)
    .process(contents["sections"].map((s) => s.body).join("\n\n"));

  const sections: {
    content: string;
    [otherKeys: string]: any;
  }[] = await Promise.all(
    contents["sections"].map(async ({ body, ...rest }) => ({
      ...rest,
      content: (await mdx(body)).renderedOutput,
    }))
  );

  return {
    plaintext: String(plaintext),
    sections,
  };
}
