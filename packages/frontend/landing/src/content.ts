import benefitsJson from '../.velite/benefits.json';
import faqJson from '../.velite/faq.json';
import featuresJson from '../.velite/features.json';
import featurePagesJson from '../.velite/featurePages.json';
import legalDocumentsJson from '../.velite/legalDocuments.json';
import textBlocksJson from '../.velite/textBlocks.json';
import useCasesJson from '../.velite/useCases.json';
import type {
  Benefit,
  FAQ,
  Feature,
  FeaturePage,
  LegalDocument,
  TextBlock,
  UseCase,
} from '../.velite';

export const benefits: Benefit[] = benefitsJson as Benefit[];
export const faq: FAQ[] = faqJson as FAQ[];
export const features: Feature[] = featuresJson as Feature[];
export const featurePages: FeaturePage[] = featurePagesJson as FeaturePage[];
export const legalDocuments: LegalDocument[] =
  legalDocumentsJson as LegalDocument[];
export const textBlocks: TextBlock[] = textBlocksJson as TextBlock[];
export const useCases: UseCase[] = useCasesJson as UseCase[];
