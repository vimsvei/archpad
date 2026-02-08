import { defineConfig, defineCollection, s } from 'velite';

const landingSections = defineCollection({
  name: 'LandingSection',
  pattern: 'landing/sections/**/*.mdx',
  schema: s.object({
    id: s.string(),
    titleKey: s.string().optional(),
    descriptionKey: s.string().optional(),
    variant: s.string().optional(),
    dataFile: s.string().optional(),
    assets: s
      .object({
        storyset: s
          .object({
            url: s.string().optional(),
            localSvg: s.string().optional(),
          })
          .optional(),
      })
      .optional(),
    cta: s
      .object({
        primaryKey: s.string().optional(),
        primaryHref: s.string().optional(),
        secondaryKey: s.string().optional(),
        secondaryHref: s.string().optional(),
      })
      .optional(),
    bodyKey: s.string().optional(),
    primaryKey: s.string().optional(),
    primaryHref: s.string().optional(),
    secondaryKey: s.string().optional(),
    secondaryHref: s.string().optional(),
    seo: s
      .object({
        titleKey: s.string().optional(),
        descriptionKey: s.string().optional(),
      })
      .optional(),
    body: s.mdx(),
  }),
});

const pages = defineCollection({
  name: 'Page',
  pattern: 'pages/**/*.mdx',
  schema: s.object({
    titleKey: s.string().optional(),
    descriptionKey: s.string().optional(),
    slug: s.string().optional(),
    nav: s
      .object({
        labelKey: s.string().optional(),
        order: s.number().optional(),
      })
      .optional(),
    seo: s
      .object({
        ogImage: s.string().optional(),
        titleKey: s.string().optional(),
        descriptionKey: s.string().optional(),
      })
      .optional(),
    cta: s
      .object({
        primaryKey: s.string().optional(),
        primaryHref: s.string().optional(),
      })
      .optional(),
    body: s.mdx(),
  }),
});

const useCases = defineCollection({
  name: 'UseCase',
  pattern: 'use-cases/**/*.mdx',
  schema: s.object({
    titleKey: s.string().optional(),
    descriptionKey: s.string().optional(),
    slug: s.string().optional(),
    tags: s.array(s.string()).optional(),
    cta: s
      .object({
        primaryKey: s.string().optional(),
        primaryHref: s.string().optional(),
      })
      .optional(),
    body: s.mdx(),
  }),
  transform: (data: { slug?: string; [key: string]: unknown }, { meta }: { meta?: { path?: string } }) => {
    const slug = data.slug ?? meta?.path?.replace(/\.mdx$/, '').replace(/^use-cases\//, '') ?? 'untitled';
    return { ...data, slug };
  },
});

const integrations = defineCollection({
  name: 'Integration',
  pattern: 'integrations/**/*.mdx',
  schema: s.object({
    titleKey: s.string().optional(),
    slug: s.slug('integrations'),
    body: s.mdx(),
  }),
});

const legal = defineCollection({
  name: 'Legal',
  pattern: 'legal/**/*.mdx',
  schema: s.object({
    titleKey: s.string().optional(),
    slug: s.slug('legal'),
    body: s.mdx(),
  }),
});

// YAML data (capabilities, personas, faq, etc.)
const capabilities = defineCollection({
  name: 'Capabilities',
  pattern: 'landing/data/capabilities.yml',
  schema: s.object({
    items: s.array(
      s.object({
        id: s.string(),
        icon: s.string(),
        titleKey: s.string(),
        bodyKey: s.string(),
      })
    ),
  }),
});

const personas = defineCollection({
  name: 'Personas',
  pattern: 'landing/data/personas.yml',
  schema: s.object({
    items: s.array(
      s.object({
        id: s.string(),
        titleKey: s.string(),
        bodyKey: s.string(),
      })
    ),
  }),
});

const faq = defineCollection({
  name: 'Faq',
  pattern: 'landing/data/faq.yml',
  schema: s.object({
    items: s.array(
      s.object({
        qKey: s.string(),
        aKey: s.string(),
      })
    ),
  }),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
  },
  collections: {
    landingSections,
    pages,
    useCases,
    integrations,
    legal,
    capabilities,
    personas,
    faq,
  },
});
