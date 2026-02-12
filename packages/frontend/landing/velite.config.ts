import { defineConfig, defineCollection, s } from 'velite';

const features = defineCollection({
  name: 'Feature',
  pattern: 'features/[0-9][0-9]-*.md',
  schema: s.object({
    title: s.string(),
    description: s.string(),
    icon: s.string(),
    color: s.string(),
    order: s.number(),
  }),
});

const featurePages = defineCollection({
  name: 'FeaturePage',
  pattern: 'features/pages/*.md',
  schema: s.object({
    slug: s.slug('features/pages'),
    title: s.string().optional(),
    metadata: s.record(s.any()).optional(),
  }),
});

const benefits = defineCollection({
  name: 'Benefit',
  pattern: 'benefits/**/*.md',
  schema: s.object({
    stat: s.string(),
    label: s.string(),
    order: s.number(),
  }),
});

const useCases = defineCollection({
  name: 'UseCase',
  pattern: 'use-cases/**/*.md',
  schema: s.object({
    title: s.string(),
    description: s.string(),
    icon: s.string(),
    image: s.string(),
    tags: s.array(s.string()),
    order: s.number(),
  }),
});

const legalDocuments = defineCollection({
  name: 'LegalDocument',
  pattern: 'legal/**/*.md',
  schema: s.object({
    slug: s.slug('legal'),
    title: s.string(),
    subtitle: s.string().optional(),
    icon: s.string(),
    lastUpdated: s.string(),
    content: s.markdown(),
  }),
});

const faq = defineCollection({
  name: 'FAQ',
  pattern: 'faq/**/*.md',
  schema: s.object({
    question: s.string(),
    answer: s.string(),
    category: s.string().optional(),
    order: s.number(),
  }),
});

const textBlocks = defineCollection({
  name: 'TextBlock',
  pattern: 'text-blocks/**/*.md',
  schema: s.object({
    slug: s.slug('text-blocks'),
    title: s.string().optional(),
    metadata: s.record(s.any()).optional(),
    steps: s.array(s.any()).optional(),
    integrations: s.array(s.any()).optional(),
    navigation: s.array(s.any()).optional(),
    footerLinks: s.any().optional(),
  }),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: {
    features,
    featurePages,
    benefits,
    useCases,
    legalDocuments,
    faq,
    textBlocks,
  },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
});
