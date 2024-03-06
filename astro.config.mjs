import { defineConfig } from 'astro/config';
import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";
import astroRemark from '@astrojs/markdown-remark';
import remarkToc from 'remark-toc'; // Add this line to import remark-toc
import remarkSlug from 'remark-slug'; // Add this line to import remark-slug
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
import mdx from "@astrojs/mdx";

import Prism from 'prismjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://ethicalhackx.com',
  integrations: [image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), sitemap(), mdx()],
  markdown: {
    syntaxHighlight: 'prism',
  },
});