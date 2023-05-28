import { z, defineCollection } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string(), //enum(["Abhinav Kumar"]),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    description: z
      .string()
      .max(
        160,
        "For best SEO results, please keep the description under 160 characters."
      ),
    draft: z.boolean().default(false),
    category: z.string(),///enum(["Offensive", "Defensive", "WebAppSec", "HackTheBox", "Hacking 101"]),
  }),
});

export const collections = { blog };
