'use client';

import * as React from 'react';
import * as runtime from 'react/jsx-runtime';
import Image from 'next/image';
import { T } from '@tolgee/react';
import { Section } from '@/components/section';
import { ButtonGroup } from '@/components/button-group';
import { CTA } from '@/components/cta';
import { FeatureGrid } from '@/components/feature-grid';
import { TwoCol } from '@/components/two-col';
import { Steps } from '@/components/steps';
import { IntegrationList } from '@/components/integration-list';
import { UseCaseCards } from '@/components/use-case-cards';
import { PersonaCards } from '@/components/persona-cards';
import { FAQAccordion } from '@/components/faq-accordion';

const sharedComponents = {
  Image,
  T,
  Section,
  ButtonGroup,
  CTA,
  FeatureGrid,
  TwoCol,
  Steps,
  IntegrationList,
  UseCaseCards,
  PersonaCards,
  FAQAccordion,
};

// Inject frontmatter into MDX scope - Velite extracts frontmatter to schema
// but compiled MDX still references `frontmatter` variable
function injectFrontmatter(code: string): string {
  return code.replace(
    /function _createMdxContent\((\w+)\)\{/,
    (_, param) =>
      `function _createMdxContent(${param}){const frontmatter=(${param}.frontmatter)||{};`
  );
}

function useMDXComponent(code: string) {
  const augmentedCode = injectFrontmatter(code);
  const fn = new Function('runtime', augmentedCode);
  const mod = fn(runtime);
  return mod?.default ?? mod;
}

type MDXContentProps = {
  code: string;
  components?: Record<string, React.ComponentType>;
  /** Section/document data - available as `frontmatter` in MDX */
  frontmatter?: Record<string, unknown>;
};

export function MDXContent({ code, components, frontmatter = {} }: MDXContentProps) {
  const Component = useMDXComponent(code);
  if (!Component) return null;
  return (
    <Component
      components={{ ...sharedComponents, ...components }}
      frontmatter={frontmatter}
    />
  );
}
