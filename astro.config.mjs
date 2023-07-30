import { defineConfig } from 'astro/config';
import image from "@astrojs/image";

import sitemap from "@astrojs/sitemap";

import astroRemark from '@astrojs/markdown-remark';
import remarkToc from 'remark-toc';
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
  remarkPlugins: [ [remarkToc, { heading: ['h1', 'h2', 'h3']} ] ],
  rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }]],
  markdown: {
    // Can be 'shiki' (default), 'prism' or false to disable highlighting
    syntaxHighlight: 'prism',
  },
});



