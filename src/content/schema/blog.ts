import { z } from 'astro:content';

// Schema para Blog
export const blogSchema = z.object({
  title: z.string(),
  date: z.date(),
  coverImage: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  author: z.string(),
});
