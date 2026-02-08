'use client';

import { T } from '@tolgee/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type FAQItem = {
  qKey: string;
  aKey: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>
            <T keyName={item.qKey} />
          </AccordionTrigger>
          <AccordionContent>
            <T keyName={item.aKey} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
