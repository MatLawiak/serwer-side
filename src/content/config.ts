import { defineCollection, z } from 'astro:content';

const wiedza = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    readingTime: z.string(),
  }),
});

export const collections = { wiedza };
