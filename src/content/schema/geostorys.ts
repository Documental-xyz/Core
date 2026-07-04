import { z } from 'astro:content';

// Schema para GeoStories
export const geoStorySchema = z.object({
  title: z.string(),
  date: z.date(),
  coverImage: z.string(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  description: z.string(),
});
