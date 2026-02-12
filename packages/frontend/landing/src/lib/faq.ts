import { faq } from '@/content';

export type FAQ = (typeof faq)[0];

export function getAllFAQ(): FAQ[] {
  return faq.sort((a, b) => a.order - b.order);
}

export function getFAQByCategory(category: string): FAQ[] {
  return faq
    .filter((item) => item.category === category)
    .sort((a, b) => a.order - b.order);
}
