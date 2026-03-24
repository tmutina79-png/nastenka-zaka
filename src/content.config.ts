import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* ── Stará kolekce docs (zachována pro zpětnou kompatibilitu) ── */
const docs = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional(),
  }),
});

/* ── Nová kolekce: Matematika (tercie, kvarta) ── */
const matematika = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/matematika' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    trida: z.enum(['tercie', 'kvarta']).optional(),
    kategorie: z.enum(['ucivo', 'priklady']).optional(),
    order: z.number().optional(),
  }),
});

export const collections = { docs, matematika };
