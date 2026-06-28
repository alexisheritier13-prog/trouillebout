import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    shortTitle: z.string().optional(),
    excerpt: z.string().optional(),
    description: z.string(),
    icon: z.enum(["maconnerie", "maison", "structure"]).optional(),
    image: z.string().optional(),
  }),
});

const realisations = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/realisations" }),
  schema: z.object({
    order: z.number(),
    location: z.string(),
    year: z.string(),
    title: z.string(),
    category: z.enum(["maconnerie", "renovation", "construction-neuve"]),
    size: z.enum(["full", "tall", "normal", "feature"]),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/pages" }),
  schema: z.any(),
});

const settings = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/settings" }),
  schema: z.object({
    companyName: z.string(),
    tagline: z.string(),
    phone: z.string(),
    email: z.string(),
    addressLine: z.string(),
    postalCode: z.string(),
    hours: z.string(),
    footerTagline: z.string(),
    copyrightYear: z.string(),
    locationTag: z.string(),
  }),
});

export const collections = { services, realisations, pages, settings };
