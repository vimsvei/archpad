declare module '#content' {
  export interface Feature {
    title: string;
    description: string;
    icon: string;
    color: string;
    order: number;
  }

  export interface FeaturePage {
    slug: string;
    title?: string;
    metadata?: Record<string, any>;
  }

  export interface Benefit {
    stat: string;
    label: string;
    order: number;
  }

  export interface UseCase {
    title: string;
    description: string;
    icon: string;
    image: string;
    tags: string[];
    order: number;
  }

  export interface LegalDocument {
    slug: string;
    title: string;
    subtitle?: string;
    icon: string;
    lastUpdated: string;
    content: string;
  }

  export interface FAQ {
    question: string;
    answer: string;
    category?: string;
    order: number;
  }

  export interface TextBlock {
    slug: string;
    title?: string;
    content: string;
    metadata?: Record<string, any>;
    steps?: any[];
    integrations?: any[];
    navigation?: any[];
    footerLinks?: any;
  }

  export const features: Feature[];
  export const featurePages: FeaturePage[];
  export const benefits: Benefit[];
  export const useCases: UseCase[];
  export const legalDocuments: LegalDocument[];
  export const faq: FAQ[];
  export const textBlocks: TextBlock[];
}
