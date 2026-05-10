"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/mdx/accordion";

export default function AccordionDefault() {
  return (
    <Accordion defaultValue="item-1" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is mdx-ui?</AccordionTrigger>
        <AccordionContent>
          mdx-ui is a collection of copy-paste MDX components built with
          Tailwind CSS. Add only what you need.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Does it work with Next.js?</AccordionTrigger>
        <AccordionContent>
          Yes. mdx-ui works with Next.js, Astro, Vite React, and any framework
          that supports MDX.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. The accordion uses proper ARIA attributes — aria-expanded on the
          trigger and keyboard focus management.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
