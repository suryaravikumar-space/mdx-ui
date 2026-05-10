"use client";
import * as React from "react";
import { Preview } from "@/components/mdx/preview";
import { DEMO_SOURCES } from "@/components/demo-sources.generated";

// Original 8
import AccordionDefault from "@/components/demos/accordion-default";
import BadgeVariants from "@/components/demos/badge-variants";
import CalloutDefault from "@/components/demos/callout-default";
import AlertDefault from "@/components/demos/alert-default";
import TabsDefault from "@/components/demos/tabs-default";
import StepsDefault from "@/components/demos/steps-default";
import CardDefault from "@/components/demos/card-default";
import SpoilerDefault from "@/components/demos/spoiler-default";

// Worker-A batch
import AnnotationDefault from "@/components/demos/annotation-default";
import BlockquoteDefault from "@/components/demos/blockquote-default";
import CertificationBadgeDefault from "@/components/demos/certification-badge-default";
import ChangelogDefault from "@/components/demos/changelog-default";
import CodeBlockDefault from "@/components/demos/code-block-default";
import ComplexityTableDefault from "@/components/demos/complexity-table-default";
import DiffBlockDefault from "@/components/demos/diff-block-default";
import EmphasisDefault from "@/components/demos/emphasis-default";
import FileTreeDefault from "@/components/demos/file-tree-default";

// Worker-B batch
import HardwareSpecDefault from "@/components/demos/hardware-spec-default";
import HeadingDefault from "@/components/demos/heading-default";
import HighlightDefault from "@/components/demos/highlight-default";
import KbdDefault from "@/components/demos/kbd-default";
import RevealDefault from "@/components/demos/reveal-default";
import SecurityNoteDefault from "@/components/demos/security-note-default";
import TerminalDefault from "@/components/demos/terminal-default";
import TreeDefault from "@/components/demos/tree-default";
import TableDefault from "@/components/demos/table-default";

// Batch-C
import ParagraphDefault from "@/components/demos/paragraph-default";
import InlineCodeDefault from "@/components/demos/inline-code-default";
import HorizontalRuleDefault from "@/components/demos/horizontal-rule-default";
import HeadingsDefault from "@/components/demos/headings-default";
import ListDefault from "@/components/demos/list-default";
import LinkDefault from "@/components/demos/link-default";
import DefinitionDefault from "@/components/demos/definition-default";
import GlossaryDefault from "@/components/demos/glossary-default";
import DataTypeTableDefault from "@/components/demos/data-type-table-default";
import PrivacyTableDefault from "@/components/demos/privacy-table-default";
import InvariantDefault from "@/components/demos/invariant-default";
import CodeGroupDefault from "@/components/demos/code-group-default";
import DataTableDefault from "@/components/demos/data-table-default";
import PreviewDefault from "@/components/demos/preview-default";
import RegisterMapDefault from "@/components/demos/register-map-default";

const DEMOS: Record<string, React.ComponentType> = {
  // Original 8
  "accordion-default": AccordionDefault,
  "badge-variants": BadgeVariants,
  "callout-default": CalloutDefault,
  "alert-default": AlertDefault,
  "tabs-default": TabsDefault,
  "steps-default": StepsDefault,
  "card-default": CardDefault,
  "spoiler-default": SpoilerDefault,
  // Worker-A batch
  "annotation-default": AnnotationDefault,
  "blockquote-default": BlockquoteDefault,
  "certification-badge-default": CertificationBadgeDefault,
  "changelog-default": ChangelogDefault,
  "code-block-default": CodeBlockDefault,
  "complexity-table-default": ComplexityTableDefault,
  "diff-block-default": DiffBlockDefault,
  "emphasis-default": EmphasisDefault,
  "file-tree-default": FileTreeDefault,
  // Worker-B batch
  "hardware-spec-default": HardwareSpecDefault,
  "heading-default": HeadingDefault,
  "highlight-default": HighlightDefault,
  "kbd-default": KbdDefault,
  "reveal-default": RevealDefault,
  "security-note-default": SecurityNoteDefault,
  "terminal-default": TerminalDefault,
  "tree-default": TreeDefault,
  "table-default": TableDefault,
  // Batch-C
  "paragraph-default": ParagraphDefault,
  "inline-code-default": InlineCodeDefault,
  "horizontal-rule-default": HorizontalRuleDefault,
  "headings-default": HeadingsDefault,
  "list-default": ListDefault,
  "link-default": LinkDefault,
  "definition-default": DefinitionDefault,
  "glossary-default": GlossaryDefault,
  "data-type-table-default": DataTypeTableDefault,
  "privacy-table-default": PrivacyTableDefault,
  "invariant-default": InvariantDefault,
  "code-group-default": CodeGroupDefault,
  "data-table-default": DataTableDefault,
  "preview-default": PreviewDefault,
  "register-map-default": RegisterMapDefault,
};

function ErrorMessage({ name }: { name: string }) {
  return (
    <div className="my-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
      Demo not found: <code>{name}</code>
    </div>
  );
}

export function ComponentPreview({ name }: { name: string }) {
  const Demo = DEMOS[name];
  const data = DEMO_SOURCES[name];

  if (!Demo || !data) {
    return <ErrorMessage name={name} />;
  }

  return (
    <Preview code={data.source} highlightedCode={data.highlighted} lang="tsx">
      <Demo />
    </Preview>
  );
}
